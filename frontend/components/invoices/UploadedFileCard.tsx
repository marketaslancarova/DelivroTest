"use client";

import { ChevronRight, Trash2 } from "lucide-react";
import { useI18n } from "@/shared/i18n/i18nProvider";
import { InvoiceTable } from "./InvoiceTable";
import { ParsedFile } from "@/lib/types/ui.types";

type UploadedFileCardProps = {
  file: ParsedFile;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function UploadedFileCard({
  file,
  onToggle,
  onRemove,
}: UploadedFileCardProps) {
  const { t } = useI18n();

  return (
    <div className="border border-slate-200 rounded-xl bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <button
          type="button"
          onClick={() => onToggle(file.id)}
          className="flex items-center gap-2 text-left"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform ${
              file.expanded ? "rotate-90" : ""
            }`}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium truncate max-w-xs sm:max-w-sm">
              {file.file.name}
            </span>
            <span className="text-xs text-slate-400">
              {file.rows.length} {t("uploadDialog.rowsLabel")}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onRemove(file.id)}
          className="inline-flex items-center justify-center rounded-full p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
          aria-label={t("uploadDialog.removeFile")}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {file.expanded && file.rows.length > 0 && (
        <div className="border-t border-slate-100 max-h-56 overflow-y-auto">
          <InvoiceTable rows={file.rows} />
        </div>
      )}
    </div>
  );
}
