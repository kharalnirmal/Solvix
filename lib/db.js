// Use the Prisma client generated to src/generated (custom output in schema.prisma)
import { PrismaClient } from "@/src/generated/client";

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
