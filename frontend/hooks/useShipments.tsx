"use client";

import { useState, useEffect, useCallback } from "react";
import { ShipmentFromApi } from "@/lib/types/shipment.types";
import { useI18n } from "@/shared/i18n/i18nProvider";
import { fetchShipments } from "@/api/shipments";

const PAGE_SIZE = 30;

type HistoryShipmentState = {
  id: string;
  trackingNumber: string;
  companyName: string;
} | null;

export function useShipments() {
  const { t } = useI18n();

  const [companyFilter, setCompanyFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // YYYY-MM-DD
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const [shipments, setShipments] = useState<ShipmentFromApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyShipment, setHistoryShipment] =
    useState<HistoryShipmentState>(null);

  const totalPages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

  const loadShipments = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchShipments({
          page,
          companyFilter: companyFilter.trim() || undefined,
          selectedDate: selectedDate || undefined,
          sortOrder,
        });

        setShipments(data.items);
        setTotal(data.total);
        setCurrentPage(data.page);
      } catch (err) {
        console.error(err);
        setError(t("dashboard.loadError") ?? "Nepodařilo se načíst zásilky.");
      } finally {
        setLoading(false);
      }
    },
    [companyFilter, selectedDate, sortOrder, t]
  );

  useEffect(() => {
    void loadShipments(1);
  }, [loadShipments]);

  const openHistoryForShipment = (s: ShipmentFromApi) => {
    setHistoryShipment({
      id: s.id,
      trackingNumber: s.trackingNumber,
      companyName: s.company.name,
    });
    setHistoryOpen(true);
  };

  return {
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
  };
}
