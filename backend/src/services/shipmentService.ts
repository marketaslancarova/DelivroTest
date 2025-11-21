import { PrismaClient, Prisma } from "@prisma/client";
import { ListShipmentsParams } from "../types";

export class ShipmentService {
  constructor(private readonly prisma: PrismaClient) {}

  async listShipments(params: ListShipmentsParams) {
    const { page, pageSize, companyId, companyName, date, sort } = params;

    const pageNum = Math.max(page || 1, 1);
    const pageSizeNum = Math.min(Math.max(pageSize || 30, 1), 100);

    const skip = (pageNum - 1) * pageSizeNum;
    const take = pageSizeNum;

    const where: Prisma.ShipmentWhereInput = {};

    if (companyId && companyId.trim() !== "") {
      where.companyId = companyId.trim();
    }

    if (companyName && companyName.trim() !== "") {
      where.company = {
        name: {
          contains: companyName.trim(),
          mode: "insensitive",
        },
      };
    }

    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
      const dayStart = new Date(date);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      where.jsonCreatedAt = {
        gte: dayStart,
        lt: dayEnd,
      };
    }

    const orderBy: Prisma.ShipmentOrderByWithRelationInput = {
      jsonCreatedAt: sort === "oldest" ? "asc" : "desc",
    };

    const [shipments, total] = await Promise.all([
      this.prisma.shipment.findMany({
        where,
        include: {
          company: true,
          invoices: {
            orderBy: { uploadedAt: "desc" },
            take: 1,
          },
        },
        orderBy,
        skip,
        take,
      }),
      this.prisma.shipment.count({ where }),
    ]);

    const items = shipments.map((s) => {
      const latestInvoice = s.invoices[0] ?? null;

      return {
        id: s.id,
        trackingNumber: s.trackingNumber,
        provider: s.provider,
        mode: s.mode,
        originCountry: s.originCountry,
        destinationCountry: s.destinationCountry,
        createdAt: s.jsonCreatedAt,
        company: {
          id: s.company.id,
          name: s.company.name,
        },
        latestInvoice: latestInvoice && {
          price: latestInvoice.invoicedPrice,
          weight: latestInvoice.invoicedWeight,
          uploadedAt: latestInvoice.uploadedAt,
        },
      };
    });

    return {
      items,
      total,
      page: pageNum,
      pageSize: pageSizeNum,
    };
  }

  async getShipmentHistory(id: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id },
      include: {
        company: true,
        invoices: {
          orderBy: { uploadedAt: "desc" },
        },
      },
    });

    if (!shipment) {
      return null;
    }

    const history = shipment.invoices.map((inv) => ({
      id: inv.id,
      price: inv.invoicedPrice,
      weight: inv.invoicedWeight,
      uploadedAt: inv.uploadedAt,
    }));

    return {
      shipment: {
        id: shipment.id,
        trackingNumber: shipment.trackingNumber,
        provider: shipment.provider,
        mode: shipment.mode,
        originCountry: shipment.originCountry,
        destinationCountry: shipment.destinationCountry,
        company: {
          id: shipment.company.id,
          name: shipment.company.name,
        },
      },
      history,
    };
  }
}
