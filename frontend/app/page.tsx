"use client";

import { useCallback } from "react";

import { ShipmentHistoryDialog } from "@/components/shipments/ShipmentHistoryDialog";
import { UploadInvoicesDialog } from "@/components/invoices/UploadInvoicesDialog";
import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";
import { useShipments } from "@/hooks/useShipments";
import { FiltersBar } from "@/components/dashboard/FiltersBar";
import { ShipmentsGrid } from "@/components/dashboard/ShipmentsGrid";
import { Pagination } from "@/components/dashboard/Pagination";
import { useI18n } from "@/shared/i18n/i18nProvider";

export default function DashboardPage() {
  const { t } = useI18n();

  const {
    companyFilter,
    setCompanyFilter,
    selectedDate,
    setSelectedDate,
    sortOrder,
    setSortOrder,
    shipments,
    loading,
    error,
    currentPage,
    total,
    totalPages,
    historyOpen,
    setHistoryOpen,
    historyShipment,
    setHistoryShipment,
    openHistoryForShipment,
    loadShipments,
  } = useShipments();

  const handleUploaded = useCallback(() => {
    loadShipments(1);
  }, [loadShipments]);

  const handleClearFilters = useCallback(() => {
    setCompanyFilter("");
    setSelectedDate("");
    setSortOrder("newest");
  }, [setCompanyFilter, setSelectedDate, setSortOrder]);

  return (
    <main className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-6xl px-4 py-8">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {t("dashboard.title")}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <UploadInvoicesDialog onUploaded={handleUploaded} />
          </div>
        </header>

        <FiltersBar
          companyFilter={companyFilter}
          selectedDate={selectedDate}
          sortOrder={sortOrder}
          onCompanyFilterChange={setCompanyFilter}
          onSelectedDateChange={setSelectedDate}
          onSortOrderChange={setSortOrder}
          onClearFilters={handleClearFilters}
        />

        <ShipmentsGrid
          shipments={shipments}
          isLoading={loading}
          error={error}
          onRetry={() => loadShipments(currentPage)}
          onShowHistory={openHistoryForShipment}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={total}
          isLoading={loading}
          onPageChange={loadShipments}
        />

        <ShipmentHistoryDialog
          open={historyOpen}
          onOpenChange={(open) => {
            setHistoryOpen(open);
            if (!open) {
              setHistoryShipment(null);
            }
          }}
          shipment={historyShipment}
        />
      </div>
    </main>
  );
}
