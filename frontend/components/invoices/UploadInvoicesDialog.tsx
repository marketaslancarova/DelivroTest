"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import type { ChangeEvent, DragEvent } from "react";

import { useI18n } from "@/shared/i18n/i18nProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Plus } from "lucide-react";

import { useInvoiceUpload } from "@/hooks/useInvoiceUpload";
import { uploadInvoices } from "@/api/invoices";
import type { InvoiceRecordJson } from "@/lib/types/invoice.types";

import { UploadDropzone } from "./UploadDropzone";
import { UploadedFileCard } from "./UploadedFileCard";
import type { ParsedFile } from "../../lib/types/ui.types";

type UploadInvoicesDialogProps = {
  onUploaded?: () => void;
};

export function UploadInvoicesDialog({
  onUploaded,
}: UploadInvoicesDialogProps) {
  const { t } = useI18n();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    parsedFiles,
    isParsing,
    addFiles,
    toggleFileExpanded,
    removeFile,
    reset,
  } = useInvoiceUpload();

  const hasFiles = parsedFiles.length > 0;

  const resetState = useCallback(() => {
    reset();
    setError(null);
    setIsUploading(false);
    setIsDragging(false);
  }, [reset]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) resetState();
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const processFiles = useCallback(
    async (files: File[]) => {
      if (!files.length) return;

      const result = await addFiles(files);
      if (result === "invalid-json") {
        setError(t("uploadDialog.invalidJson"));
      }
    },
    [addFiles, t]
  );

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;

    await processFiles(Array.from(fileList));
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const jsonFiles = Array.from(e.dataTransfer.files).filter(
      (file) =>
        file.type === "application/json" ||
        file.name.toLowerCase().endsWith(".json")
    );

    await processFiles(jsonFiles);
  };

  const handleConfirmUpload = async () => {
    if (!parsedFiles.length) {
      setError(t("uploadDialog.invalidJson"));
      return;
    }

    const allRecords: InvoiceRecordJson[] = parsedFiles.flatMap(
      (pf) => pf.records
    );

    setIsUploading(true);
    setError(null);

    try {
      await uploadInvoices(allRecords);
      setOpen(false);
      resetState();
      onUploaded?.();
    } catch (err) {
      console.error(err);
      setError(t("uploadDialog.errorUpload"));
    } finally {
      setIsUploading(false);
    }
  };

  const footerButtonLabel = useMemo(
    () =>
      isUploading ? t("uploadDialog.uploading") : t("uploadDialog.confirm"),
    [isUploading, t]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full bg-[#00C3A0] hover:bg-[#009E85] text-white"
          size="sm"
          type="button"
        >
          {t("dashboard.uploadInvoices")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("uploadDialog.title")}</DialogTitle>
          <DialogDescription>{t("uploadDialog.helperText")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-4">
            <UploadDropzone
              isDragging={isDragging}
              hasFiles={hasFiles}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onOpenFilePicker={openFilePicker}
              childrenWhenFiles={
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {t("uploadDialog.uploadedFilesLabel")}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-slate-600 hover:bg-slate-100"
                      onClick={openFilePicker}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {t("uploadDialog.addMore")}
                    </Button>
                  </div>

                  {parsedFiles.map((pf) => (
                    <UploadedFileCard
                      key={pf.id}
                      file={pf as ParsedFile}
                      onToggle={toggleFileExpanded}
                      onRemove={removeFile}
                    />
                  ))}
                </div>
              }
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              multiple
              className="hidden"
              onChange={handleFileInputChange}
            />

            {isParsing && (
              <Badge variant="outline">{t("uploadDialog.parsing")}</Badge>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </div>
            )}
          </div>

          <DialogFooter>
            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                {t("uploadDialog.cancel")}
              </Button>
              <Button
                type="button"
                onClick={handleConfirmUpload}
                disabled={isUploading || !hasFiles}
                className="bg-[#00C3A0] hover:bg-[#009E85] text-white"
              >
                {footerButtonLabel}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
