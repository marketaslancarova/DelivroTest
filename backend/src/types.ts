import { z } from "zod";

export const providerSchema = z.enum(["GLS", "DPD", "UPS", "PPL", "FedEx"]);
export const shipmentModeSchema = z.enum(["IMPORT", "EXPORT"]);

export const invoiceRecordSchema = z.object({
  id: z.string().min(1),
  shipment: z.object({
    id: z.string().min(1),
    createdAt: z.string().min(1),
    trackingNumber: z.string().min(1),
    company: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    }),
    provider: providerSchema,
    mode: shipmentModeSchema,
    originCountry: z.string().min(1),
    destinationCountry: z.string().min(1),
  }),
  invoicedPrice: z.number().int().nonnegative(),
  invoicedWeight: z.number().nonnegative(),
});

export const invoiceArraySchema = z.array(invoiceRecordSchema);

export type InvoiceRecordJson = z.infer<typeof invoiceRecordSchema>;

export const shipmentsQuerySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  companyId: z.string().optional(),
  companyName: z.string().optional(),
  date: z.string().optional(),
  sort: z.enum(["newest", "oldest"]).optional(),
});

export type ListShipmentsParams = {
  page: number;
  pageSize: number;
  companyId?: string;
  companyName?: string;
  date?: string;
  sort: "newest" | "oldest";
};
