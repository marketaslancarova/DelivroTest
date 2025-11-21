// src/config.ts
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z
    .string()
    .default("4000")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !Number.isNaN(val) && val > 0 && val < 65536, {
      message: "PORT must be a valid port number",
    }),

  DATABASE_URL: z.string().url(),
  FRONTEND_ORIGIN: z.string().url().optional(),

  // --- MinIO / S3-API compatible ---
  MINIO_ENDPOINT: z.string().url().optional(),
  MINIO_REGION: z.string().default("us-east-1"),
  MINIO_ACCESS_KEY: z.string().optional(),
  MINIO_SECRET_KEY: z.string().optional(),
  MINIO_BUCKET: z.string().min(1).default("invoices"),
});

const _parsed = envSchema.safeParse(process.env);

if (!_parsed.success) {
  console.error("Invalid environment configuration");
  console.error(_parsed.error.format());
  process.exit(1);
}

const parsed = _parsed.data;

export const config = {
  nodeEnv: parsed.NODE_ENV,
  port: parsed.PORT,
  databaseUrl: parsed.DATABASE_URL,
  frontendOrigin: parsed.FRONTEND_ORIGIN ?? "http://localhost:3000",

  // MinIO
  minioEndpoint: parsed.MINIO_ENDPOINT,
  minioRegion: parsed.MINIO_REGION,
  minioBucket: parsed.MINIO_BUCKET,
  minioAccessKey: parsed.MINIO_ACCESS_KEY,
  minioSecretKey: parsed.MINIO_SECRET_KEY,
} as const;
