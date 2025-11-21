import { BACKEND_URL } from "@/lib/utils/config";
import {
  ShipmentHistory,
  ShipmentHistoryApiResponse,
  ShipmentHistoryItem,
  ShipmentsResponse,
} from "@/lib/types/shipment.types";

export async function fetchShipmentHistory(
  shipmentId: string,
  signal?: AbortSignal
): Promise<ShipmentHistory> {
  const res = await fetch(
    `${BACKEND_URL}/api/shipments/${shipmentId}/history`,
    { signal }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch shipment history (${res.status}): ${
        text || res.statusText
      }`
    );
  }

  const data = (await res.json()) as ShipmentHistoryApiResponse;

  const items: ShipmentHistoryItem[] = data.history.map((h) => ({
    id: h.id,
    price: typeof h.price === "string" ? Number(h.price) : h.price,
    weight: h.weight,
    uploadedAt: h.uploadedAt,
  }));

  return {
    shipmentId: data.shipment.id,
    items,
  };
}

export async function fetchShipments(params: {
  page: number;
  companyFilter?: string;
  selectedDate?: string;
  sortOrder?: string;
}) {
  const url = new URL(`${BACKEND_URL}/api/shipments`);
  url.searchParams.set("page", String(params.page));
  url.searchParams.set("pageSize", "30");

  if (params.companyFilter)
    url.searchParams.set("companyName", params.companyFilter);
  if (params.selectedDate) url.searchParams.set("date", params.selectedDate);
  if (params.sortOrder) url.searchParams.set("sort", params.sortOrder);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to load shipments");

  return res.json() as Promise<ShipmentsResponse>;
}

export type { ShipmentHistoryItem };
