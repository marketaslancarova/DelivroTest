"use client";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useI18n } from "@/shared/i18n/i18nProvider";
import { FiltersBarProps, SortOrder } from "@/lib/types/ui.types";

export function FiltersBar({
  companyFilter,
  onCompanyFilterChange,
  selectedDate,
  onSelectedDateChange,
  sortOrder,
  onSortOrderChange,
  onClearFilters,
}: FiltersBarProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <Input
        value={companyFilter}
        onChange={(e) => onCompanyFilterChange(e.target.value)}
        placeholder={t("dashboard.filterPlaceholder")}
        className="w-60 rounded-full bg-white border border-slate-200 shadow-sm"
      />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {t("dashboard.dateLabel")}
          </span>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => onSelectedDateChange(e.target.value)}
            className="rounded-full bg-white border border-slate-200 shadow-sm text-sm px-3 py-1 h-8"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {t("dashboard.sortLabel")}
          </span>
          <select
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm h-8"
          >
            <option value="newest">{t("dashboard.sortNewest")}</option>
            <option value="oldest">{t("dashboard.sortOldest")}</option>
          </select>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="rounded-full px-4 py-2"
        >
          {t("dashboard.resetButton")}
        </Button>
      </div>
    </div>
  );
}
