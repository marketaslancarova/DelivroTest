import { BACKEND_URL } from "@/lib/utils/config";
import type { InvoiceRecordJson } from "@/lib/types/invoice.types";

export async function uploadInvoices(
  records: InvoiceRecordJson[]
): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/invoices/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(records),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upload failed: ${res.status} ${text || res.statusText}`);
  }
}
