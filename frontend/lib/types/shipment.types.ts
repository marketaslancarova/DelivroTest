export type ShipmentFromApi = {
  id: string;
  trackingNumber: string;
  provider: string;
  mode: "EXPORT" | "IMPORT";
  originCountry: string;
  destinationCountry: string;
  createdAt: string;
  company: {
    id: string;
    name: string;
  };
  latestInvoice: null | {
    price: number;
    weight: string;
    uploadedAt: string;
  };
};

export type ShipmentsResponse = {
  items: ShipmentFromApi[];
  total: number;
  page: number;
  pageSize: number;
};

export type ShipmentHistoryApiItem = {
  id: string;
  price: number | string;
  weight: string;
  uploadedAt: string;
};

export type ShipmentHistoryApiResponse = {
  shipment: {
    id: string;
    trackingNumber: string;
    provider: string;
    mode: "EXPORT" | "IMPORT";
    originCountry: string;
    destinationCountry: string;
    company: {
      id: string;
      name: string;
    };
  };
  history: ShipmentHistoryApiItem[];
};

export type ShipmentHistoryItem = {
  id: string;
  price: number;
  weight: string;
  uploadedAt: string;
};

export type ShipmentHistory = {
  shipmentId: string;
  items: ShipmentHistoryItem[];
};
