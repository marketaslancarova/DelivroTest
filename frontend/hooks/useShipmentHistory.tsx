"use client";

import { useEffect, useState, useCallback } from "react";
import {
  fetchShipmentHistory,
  type ShipmentHistoryItem,
} from "@/api/shipments";

type UseShipmentHistoryState = {
  items: ShipmentHistoryItem[];
  loading: boolean;
  error: Error | null;
  reload: () => void;
};

export function useShipmentHistory(
  shipmentId: string | null,
  enabled: boolean
): UseShipmentHistoryState {
  const [items, setItems] = useState<ShipmentHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!shipmentId || !enabled) {
        setItems([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchShipmentHistory(shipmentId, signal);
        setItems(result.items);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;

        console.error(err);
        setError(err as Error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [shipmentId, enabled]
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);

    return () => {
      controller.abort();
    };
  }, [load]);

  return {
    items,
    loading,
    error,
    reload: () => {
      void load();
    },
  };
}
