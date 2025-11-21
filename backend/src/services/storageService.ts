import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { config } from "../config";

export class StorageService {
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor() {
    if (!config.minioEndpoint) {
      console.warn(
        "[StorageService] MINIO_ENDPOINT is not set. StorageService will be disabled."
      );
    }

    this.s3 = new S3Client({
      endpoint: config.minioEndpoint,
      region: config.minioRegion,
      credentials:
        config.minioAccessKey && config.minioSecretKey
          ? {
              accessKeyId: config.minioAccessKey,
              secretAccessKey: config.minioSecretKey,
            }
          : undefined,
      forcePathStyle: true,
    });

    this.bucket = config.minioBucket;
  }

  private async exists(key: string): Promise<boolean> {
    if (!config.minioEndpoint) return false;
    try {
      await this.s3.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: key,
        })
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async uploadJson(key: string, data: unknown) {
    if (!config.minioEndpoint) return;

    const alreadyExists = await this.exists(key);
    if (alreadyExists) {
      return;
    }

    const body = JSON.stringify(data, null, 2);

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType: "application/json",
      })
    );
  }
}
