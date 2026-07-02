import type { PrismaClient } from "@/app/generated/prisma/client";

export type RequestMeta = {
  ipHash?: string;
  userAgent?: string;
};

export type ServiceOptions = {
  db?: PrismaClient;
};
