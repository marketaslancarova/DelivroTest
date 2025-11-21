import { ReactNode } from "react";

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

export type FileRow = {
  id: string;
  trackingNumber: string;
  companyName: string;
  provider: string;
  originCountry: string;
  destinationCountry: string;
  invoicedPrice: number;
  invoicedWeight?: number | null;
};

export type ParsedFile = {
  id: string;
  file: File;
  rows: FileRow[];
  records: InvoiceRecordJson[];
  expanded: boolean;
};

export type UploadDropzoneProps = {
  isDragging: boolean;
  hasFiles: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onOpenFilePicker: () => void;
  childrenWhenFiles: ReactNode;
};
