import { PrismaClient } from "@prisma/client";

/**
 * Unique instance of prisma to use throughout the entire app.
 */
export const prismaClient = new PrismaClient();
