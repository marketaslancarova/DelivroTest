"use client";

import { ShipmentCard } from "@/components/shipments/shipmentCard/ShipmentCard";
import { Button } from "@/shared/ui/button";
import { useI18n } from "@/shared/i18n/i18nProvider";
import { DEFAULT_CURRENCY } from "@/lib/utils/config";
import { ShipmentsGridProps } from "@/lib/types/ui.types";

export function ShipmentsGrid({
  shipments,
  isLoading,
  error,
  onRetry,
  onShowHistory,
}: ShipmentsGridProps) {
  const { t } = useI18n();

  if (isLoading) {
    return (
      <div className="mb-4 text-sm text-slate-500">
        {t("dashboard.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 flex items-center justify-between rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm">
        <span className="text-red-700">{error}</span>
        <Button type="button" variant="outline" size="sm" onClick={onRetry}>
          {t("dashboard.retry")}
        </Button>
      </div>
    );
  }

  if (shipments.length === 0) {
    return (
      <div className="col-span-full rounded-2xl bg-white border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        {t("dashboard.noShipments")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {shipments.map((s) => (
        <ShipmentCard
          key={s.id}
          trackingNumber={s.trackingNumber}
          companyName={s.company.name}
          provider={s.provider}
          price={s.latestInvoice?.price ?? 0}
          currency={DEFAULT_CURRENCY}
          createdAt={s.createdAt}
          originCountry={s.originCountry}
          destinationCountry={s.destinationCountry}
          mode={s.mode}
          hasHistory={!!s.latestInvoice}
          onShowHistory={() => onShowHistory(s)}
        />
      ))}
    </div>
  );
}
