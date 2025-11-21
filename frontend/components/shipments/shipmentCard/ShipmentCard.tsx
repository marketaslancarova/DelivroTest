"use client";

import { ModeBadge } from "./ModeBadge";
import { HistoryButton } from "./HistoryButton";
import { formatDate, formatPrice } from "@/lib/utils/utils";
import { useI18n } from "@/shared/i18n/i18nProvider";
import { ShipmentCardProps } from "@/lib/types/ui.types";

export function ShipmentCard(props: ShipmentCardProps) {
  const { locale } = useI18n();
  const {
    trackingNumber,
    companyName,
    provider,
    price,
    currency = "CZK",
    createdAt,
    originCountry,
    destinationCountry,
    mode,
    hasHistory,
    onShowHistory,
  } = props;

  const date = formatDate(createdAt, locale);
  const priceFormatted = formatPrice(price, currency, locale);

  return (
    <div className="relative flex items-stretch gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:border-[#00C3A0] hover:shadow-md transition-all overflow-hidden min-h-[115px]">
      <div className="flex items-center pr-2">
        <div className="text-2xl font-extrabold text-slate-900 whitespace-nowrap">
          {provider}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-slate-400 font-medium">
            TRK#
          </div>
          <div className="text-sm font-semibold text-slate-900 break-all">
            {trackingNumber}
          </div>
          <div className="text-xs text-slate-500 truncate">{companyName}</div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#00997F] whitespace-nowrap">
              {priceFormatted}
            </span>
          </div>

          <div className="route">
            <span>{originCountry}</span>
            <span>→</span>
            <span>{destinationCountry}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end text-right whitespace-nowrap">
        <div className="text-xs text-slate-500">{date}</div>

        <div className="flex items-center gap-1 mt-2">
          <ModeBadge mode={mode} />
          {hasHistory && <HistoryButton onClick={onShowHistory} />}
        </div>
      </div>
    </div>
  );
}
