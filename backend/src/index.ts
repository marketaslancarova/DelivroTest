// src/index.ts
import express from "express";
import cors from "cors";
import { createContainer } from "./container";
import { createInvoicesRouter } from "./routes/invoices";
import { createShipmentsRouter } from "./routes/shipments";

import { config } from "./config";
import { prisma } from "./db";

const app = express();
const container = createContainer();

app.use(
  cors({
    origin: "*", // DEV
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));

// normální API
app.use(
  "/api/invoices",
  createInvoicesRouter(container.invoiceService, container.storageService)
);
app.use("/api/shipments", createShipmentsRouter(container.shipmentService));

app.get("/ping", (req, res) => {
  res.json({ ok: true });
});
const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(
    `Backend běží na http://localhost:${PORT} (env: ${config.nodeEnv})`
  );
});

// graceful shutdown
const shutdown = async () => {
  console.log("Shutting down server...");
  await prisma.$disconnect();
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
