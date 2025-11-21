"use client";

import type { KeyboardEvent } from "react";
import { useI18n } from "@/shared/i18n/i18nProvider";
import { UploadDropzoneProps } from "@/lib/types/invoice.types";

export function UploadDropzone({
  isDragging,
  hasFiles,
  onDragOver,
  onDragLeave,
  onDrop,
  onOpenFilePicker,
  childrenWhenFiles,
}: UploadDropzoneProps) {
  const { t } = useI18n();

  const dropzoneBaseClasses =
    "border border-dashed rounded-2xl bg-slate-50/50 transition px-4";
  const dropzonePadding = hasFiles ? "py-4" : "py-8";
  const dropzoneStateClasses = isDragging
    ? "border-[#00C3A0] bg-emerald-50/50"
    : "border-slate-200";

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenFilePicker();
    }
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`${dropzoneBaseClasses} ${dropzonePadding} ${dropzoneStateClasses}`}
    >
      {!hasFiles ? (
        <div
          role="button"
          tabIndex={0}
          onClick={onOpenFilePicker}
          onKeyDown={handleKeyDown}
          className="w-full flex flex-col items-center gap-1 text-center cursor-pointer"
        >
          <span className="text-slate-600">
            {t("uploadDialog.dropHereText")}
          </span>
          <span className="text-xs text-slate-400">
            {t("uploadDialog.dropHereSubtextPrefix")}{" "}
            <span className="underline text-[#00997F] hover:text-[#007a64]">
              {t("uploadDialog.dropHereSubtextClick")}
            </span>
          </span>
        </div>
      ) : (
        childrenWhenFiles
      )}
    </div>
  );
}
