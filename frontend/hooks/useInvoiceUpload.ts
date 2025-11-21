"use client";

import { useState } from "react";
import type {
  ParsedFile,
  InvoiceRecordJson,
  PreviewRow,
} from "@/lib/types/ui.types";

export type AddFilesResult = "ok" | "invalid-json" | "no-new-files";

const buildFileKey = (file: File): string =>
  `${file.name}-${file.lastModified}-${file.size}`;

const createPreviewRows = (
  file: File,
  records: InvoiceRecordJson[]
): PreviewRow[] =>
  records.map((raw, index) => {
    const shipment = raw.shipment;
    const company = shipment.company;

    return {
      id: raw.id ?? `file-${file.name}-row-${index}`,
      trackingNumber: shipment.trackingNumber ?? "N/A",
      companyName: company.name ?? "Unknown",
      provider: shipment.provider ?? "N/A",
      originCountry: shipment.originCountry ?? "-",
      destinationCountry: shipment.destinationCountry ?? "-",
      invoicedPrice: Number(raw.invoicedPrice ?? 0),
      invoicedWeight:
        raw.invoicedWeight !== undefined && raw.invoicedWeight !== null
          ? Number(raw.invoicedWeight)
          : null,
    };
  });

async function parseFileToParsedFile(file: File): Promise<ParsedFile> {
  const text = await file.text();

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new SyntaxError("INVALID_JSON");
  }

  const records: InvoiceRecordJson[] = Array.isArray(parsed)
    ? (parsed as InvoiceRecordJson[])
    : [parsed as InvoiceRecordJson];

  const rows = createPreviewRows(file, records);

  return {
    id: buildFileKey(file),
    file,
    rows,
    records,
    expanded: false,
  };
}

export function useInvoiceUpload() {
  const [parsedFiles, setParsedFiles] = useState<ParsedFile[]>([]);
  const [isParsing, setIsParsing] = useState(false);

  const reset = () => {
    setParsedFiles([]);
    setIsParsing(false);
  };

  const addFiles = async (filesToAdd: File[]): Promise<AddFilesResult> => {
    if (filesToAdd.length === 0) return "no-new-files";

    setIsParsing(true);

    try {
      const existingKeys = new Set(parsedFiles.map((pf) => pf.id));
      const uniqueFiles = filesToAdd.filter(
        (file) => !existingKeys.has(buildFileKey(file))
      );

      if (uniqueFiles.length === 0) {
        return "no-new-files";
      }

      let newParsed: ParsedFile[];

      try {
        newParsed = await Promise.all(
          uniqueFiles.map((file) => parseFileToParsedFile(file))
        );
      } catch (err) {
        if (err instanceof SyntaxError) {
          return "invalid-json";
        }
        throw err;
      }

      if (newParsed.length > 0) {
        setParsedFiles((prev) => [...prev, ...newParsed]);
        return "ok";
      }

      return "no-new-files";
    } finally {
      setIsParsing(false);
    }
  };

  const toggleFileExpanded = (id: string) => {
    setParsedFiles((prev) =>
      prev.map((pf) => (pf.id === id ? { ...pf, expanded: !pf.expanded } : pf))
    );
  };

  const removeFile = (id: string) => {
    setParsedFiles((prev) => prev.filter((pf) => pf.id !== id));
  };

  return {
    parsedFiles,
    isParsing,
    addFiles,
    toggleFileExpanded,
    removeFile,
    reset,
  };
}
