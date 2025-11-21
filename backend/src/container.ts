// src/container.ts
import { prisma } from "./db";
import { InvoiceService } from "./services/invoiceService";
import { ShipmentService } from "./services/shipmentService";
import { StorageService } from "./services/storageService";

export function createContainer() {
  const storageService = new StorageService();
  const invoiceService = new InvoiceService(prisma);
  const shipmentService = new ShipmentService(prisma);

  return {
    storageService,
    invoiceService,
    shipmentService,
  };
}

export type ContainerType = ReturnType<typeof createContainer>;
