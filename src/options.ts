import type { Prisma } from "@prisma/client";

export interface PrismaPluginOptions {
  /**
   * Database connection string
   */
  url?: string;
  /**
   * Default log all level
   */
  logLevel?: Prisma.LogLevel[];
  /**
   * Disable plugin in log bindings
   */
  disableLogBindings?: boolean;
}
