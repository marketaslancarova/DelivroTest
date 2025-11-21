import { Clock } from "lucide-react";
import { useI18n } from "@/shared/i18n/i18nProvider";

export function HistoryButton({ onClick }: { onClick: () => void }) {
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1 hover:bg-slate-100 rounded-full transition"
      title={t("dashboard.showHistory")}
      aria-label={t("dashboard.showHistory")}
    >
      <Clock size={16} className="text-slate-500 hover:text-[#00997F]" />
    </button>
  );
}
