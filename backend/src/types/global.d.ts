import { Prisma, PrismaClient } from "@/generated/index.js";

export type DBType = PrismaClient | Prisma.TransactionClient;
