import { ShipmentFromApi } from "./shipment.types";

export type SortOrder = "newest" | "oldest";

export type FiltersBarProps = {
  companyFilter: string;
  onCompanyFilterChange: (value: string) => void;
  selectedDate: string; // YYYY-MM-DD
  onSelectedDateChange: (value: string) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
  onClearFilters: () => void;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

export type ShipmentsGridProps = {
  shipments: ShipmentFromApi[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onShowHistory: (shipment: ShipmentFromApi) => void;
};

// src/lib/ui.types.ts

export type PreviewRow = {
  id: string;
  trackingNumber: string;
  companyName: string;
  provider: string;
  originCountry: string;
  destinationCountry: string;
  invoicedPrice: number;
  invoicedWeight: number | null;
};

export type InvoiceRecordJson = {
  id: string;
  shipment: {
    id: string;
    createdAt: string;
    trackingNumber: string;
    company: {
      id: string;
      name: string;
    };
    provider: "GLS" | "DPD" | "UPS" | "PPL" | "FedEx";
    mode: "IMPORT" | "EXPORT";
    originCountry: string;
    destinationCountry: string;
  };
  invoicedPrice: number;
  invoicedWeight?: number | null;
};

export type ParsedFile = {
  id: string;
  file: File;
  rows: PreviewRow[];
  records: InvoiceRecordJson[];
  expanded: boolean;
};

export type ShipmentCardProps = {
  trackingNumber: string;
  companyName: string;
  provider: string;
  price: number;
  currency?: string;
  createdAt: string;
  originCountry: string;
  destinationCountry: string;
  mode: "EXPORT" | "IMPORT" | string;
  hasHistory: boolean;
  onShowHistory: () => void;
};
