import { Prisma, PrismaClient } from "@prisma/client";
import { InvoiceRecordJson } from "../types";

export class InvoiceService {
  constructor(private readonly prisma: PrismaClient) {}

  async importInvoicesFromJson(records: InvoiceRecordJson[]) {
    if (!records.length) {
      return { count: 0 };
    }

    const uploadedAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      let count = 0;

      for (const record of records) {
        const {
          shipment,
          invoicedPrice,
          invoicedWeight,
          id: invoiceId,
        } = record;
        const company = shipment.company;

        await tx.company.upsert({
          where: { id: company.id },
          update: { name: company.name },
          create: { id: company.id, name: company.name },
        });

        await tx.shipment.upsert({
          where: { id: shipment.id },
          update: {
            trackingNumber: shipment.trackingNumber,
            provider: shipment.provider,
            mode: shipment.mode,
            originCountry: shipment.originCountry,
            destinationCountry: shipment.destinationCountry,
            companyId: company.id,
            jsonCreatedAt: new Date(shipment.createdAt),
          },
          create: {
            id: shipment.id,
            trackingNumber: shipment.trackingNumber,
            provider: shipment.provider,
            mode: shipment.mode,
            originCountry: shipment.originCountry,
            destinationCountry: shipment.destinationCountry,
            companyId: company.id,
            jsonCreatedAt: new Date(shipment.createdAt),
          },
        });

        await tx.invoice.upsert({
          where: { id: invoiceId },
          update: {
            invoicedPrice,
            invoicedWeight: new Prisma.Decimal(invoicedWeight),
            uploadedAt,
          },
          create: {
            id: invoiceId,
            invoicedPrice,
            invoicedWeight: new Prisma.Decimal(invoicedWeight),
            shipmentId: shipment.id,
            uploadedAt,
          },
        });

        count++;
      }

      return { count };
    });
  }
}
