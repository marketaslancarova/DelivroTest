import { useI18n } from "@/shared/i18n/i18nProvider";

export function ModeBadge({ mode }: { mode: string }) {
  const { t } = useI18n();
  const isExport = mode === "EXPORT";

  return (
    <span
      className={`
        inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold
        ${isExport ? "bg-[#D9F7EF] text-[#00997F]" : "bg-[#1F2937] text-white"}
      `}
    >
      {isExport ? t("dashboard.export") : t("dashboard.import")}
    </span>
  );
}
