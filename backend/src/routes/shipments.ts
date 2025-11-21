import { Router } from "express";
import { shipmentsQuerySchema, ListShipmentsParams } from "../types";
import { ShipmentService } from "../services/shipmentService";

export function createShipmentsRouter(shipmentService: ShipmentService) {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      const parsed = shipmentsQuerySchema.safeParse(req.query);

      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid query parameters",
          details: parsed.error.format(),
        });
      }

      const { page, pageSize, companyId, companyName, date, sort } =
        parsed.data;

      const pageNum = parseInt(page ?? "1", 10);
      const pageSizeNum = parseInt(pageSize ?? "30", 10);

      const params: ListShipmentsParams = {
        page: Number.isNaN(pageNum) ? 1 : Math.max(pageNum, 1),
        pageSize: Number.isNaN(pageSizeNum)
          ? 30
          : Math.min(Math.max(pageSizeNum, 1), 100),
        companyId,
        companyName,
        date,
        sort: sort === "oldest" ? "oldest" : "newest",
      };

      const result = await shipmentService.listShipments(params);
      res.json(result);
    } catch (err) {
      console.error("Error in GET /api/shipments:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/:id/history", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await shipmentService.getShipmentHistory(id);

      if (!result) {
        return res.status(404).json({ error: "Shipment not found" });
      }

      res.json(result);
    } catch (err) {
      console.error("Error in GET /api/shipments/:id/history:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
}
