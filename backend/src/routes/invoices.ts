import { Router } from "express";
import { invoiceArraySchema } from "../types";
import { InvoiceService } from "../services/invoiceService";
import { StorageService } from "../services/storageService";

export function createInvoicesRouter(
  invoiceService: InvoiceService,
  storageService: StorageService
) {
  const router = Router();

  router.post("/upload", async (req, res) => {
    try {
      console.log(">>> /api/invoices/upload HIT");
      const parsed = invoiceArraySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid payload: expected an array of invoice records",
          details: parsed.error.format(),
        });
      }

      const records = parsed.data;

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const key = `invoices/${timestamp}.json`;
      console.log(">>> calling uploadJson with key", key);
      await storageService.uploadJson(key, records);

      const result = await invoiceService.importInvoicesFromJson(records);

      res
        .status(201)
        .json({ message: "Invoices imported successfully", ...result });
    } catch (err) {
      console.error("Error while uploading invoices:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
}
