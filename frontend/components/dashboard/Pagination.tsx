"use client";

import { Button } from "@/shared/ui/button";
import { useI18n } from "@/shared/i18n/i18nProvider";
import { PaginationProps } from "@/lib/types/ui.types";

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  isLoading,
  onPageChange,
}: PaginationProps) {
  const { t } = useI18n();

  if (totalItems === 0 || totalPages <= 1) return null;

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
      <div>
        {t("dashboard.paginationPageLabel")} {currentPage} / {totalPages} ·{" "}
        {t("dashboard.paginationTotalLabelPrefix")} {totalItems}{" "}
        {t("dashboard.paginationShipmentsLabel")}
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canGoPrev || isLoading}
          onClick={() => canGoPrev && onPageChange(currentPage - 1)}
        >
          {t("dashboard.prevPage")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canGoNext || isLoading}
          onClick={() => canGoNext && onPageChange(currentPage + 1)}
        >
          {t("dashboard.nextPage")}
        </Button>
      </div>
    </div>
  );
}
