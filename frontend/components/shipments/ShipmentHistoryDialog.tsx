"use client";

import { useI18n } from "@/shared/i18n/i18nProvider";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useShipmentHistory } from "@/hooks/useShipmentHistory";

type ShipmentSummary = {
  id: string;
  trackingNumber: string;
  companyName: string;
};

type ShipmentHistoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipment: ShipmentSummary | null;
};

export function ShipmentHistoryDialog({
  open,
  onOpenChange,
  shipment,
}: ShipmentHistoryDialogProps) {
  const { t, locale } = useI18n();

  const shipmentId = shipment?.id ?? null;
  const { items, loading, error } = useShipmentHistory(shipmentId, open);

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString(locale === "cs" ? "cs-CZ" : "en-US");

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {t("shipmentHistory.title")}{" "}
            {shipment
              ? `– ${shipment.trackingNumber} (${shipment.companyName})`
              : ""}
          </DialogTitle>
        </DialogHeader>

        {!shipment && (
          <div className="text-sm text-slate-500">
            {t("shipmentHistory.noShipmentSelected")}
          </div>
        )}

        {shipment && (
          <>
            {loading && (
              <div className="text-sm text-slate-500">
                {t("shipmentHistory.loading")}
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600">
                {t("shipmentHistory.error")}
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="text-sm text-slate-500">
                {t("shipmentHistory.empty")}
              </div>
            )}

            {!loading && !error && items.length > 0 && (
              <div className="max-h-72 overflow-y-auto">
                <Table className="text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("shipmentHistory.colId")}</TableHead>
                      <TableHead className="text-right">
                        {t("shipmentHistory.colPrice")}
                      </TableHead>
                      <TableHead className="text-right">
                        {t("shipmentHistory.colWeight")}
                      </TableHead>
                      <TableHead>
                        {t("shipmentHistory.colUploadedAt")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((h) => (
                      <TableRow key={h.id}>
                        <TableCell className="font-mono text-xs">
                          {h.id}
                        </TableCell>
                        <TableCell className="text-right">
                          {h.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">{h.weight}</TableCell>
                        <TableCell>{formatDateTime(h.uploadedAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
