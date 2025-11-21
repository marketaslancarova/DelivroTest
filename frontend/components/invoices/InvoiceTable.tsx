"use client";

import { FileRow } from "@/lib/types/invoice.types";
import { useI18n } from "@/shared/i18n/i18nProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

type InvoiceTableProps = {
  rows: FileRow[];
};

export function InvoiceTable({ rows }: InvoiceTableProps) {
  const { t } = useI18n();

  return (
    <Table className="w-full text-sm table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[140px]">
            {t("uploadDialog.colTracking")}
          </TableHead>
          <TableHead className="w-[220px]">{t("dashboard.company")}</TableHead>
          <TableHead className="w-[100px]">
            {t("uploadDialog.colProvider")}
          </TableHead>
          <TableHead className="w-[120px]">
            {t("uploadDialog.colRoute")}
          </TableHead>
          <TableHead className="text-right w-[90px]">
            {t("uploadDialog.colPrice")}
          </TableHead>
          <TableHead className="text-right w-[90px]">
            {t("uploadDialog.colWeight")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.trackingNumber}</TableCell>
            <TableCell className="truncate">{row.companyName}</TableCell>
            <TableCell>{row.provider}</TableCell>
            <TableCell>
              {row.originCountry} → {row.destinationCountry}
            </TableCell>
            <TableCell className="text-right text-[#00997F] font-semibold">
              {row.invoicedPrice.toFixed(2)}
            </TableCell>
            <TableCell className="text-right">
              {row.invoicedWeight ?? "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
