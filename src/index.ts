import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

import type { PrismaPluginOptions } from "./options.js";
export type { PrismaPluginOptions } from "./options.js";

const name = "@joshuaavalon/fastify-plugin-prisma";
export default fp<PrismaPluginOptions>(
  async (app, opts) => {
    const { url, logLevel, disableLogBindings } = opts;
    const db = new PrismaClient({
      datasourceUrl: url,
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" }
      ]
    });
    const logger = disableLogBindings
      ? app.log
      : app.log.child({ plugin: name });
    if (!logLevel || "query" in logLevel) {
      db.$on("query", e => {
        const { query, params, duration } = e;
        logger.debug({ query, params, duration });
      });
    }
    if (!logLevel || "error" in logLevel) {
      db.$on("error", e => {
        logger.error(e.message);
      });
    }
    if (!logLevel || "info" in logLevel) {
      db.$on("info", e => {
        logger.info(e.message);
      });
    }
    if (!logLevel || "warn" in logLevel) {
      db.$on("warn", e => {
        logger.warn(e.message);
      });
    }
    app.decorate("db", db);
    app.addHook("onClose", async app => {
      await app.db.$disconnect();
    });
  },
  {
    name,
    fastify: "4.x",
    dependencies: [],
    decorators: {}
  }
);

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
  }
}
