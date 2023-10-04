# @joshuaavalon/fastify-plugin-prisma

[![Version](https://badge.fury.io/js/@joshuaavalon/fastify-plugin-prisma.svg)](https://www.npmjs.com/package/@joshuaavalon/fastify-plugin-prisma)
[![npm](https://img.shields.io/npm/dt/@joshuaavalon/fastify-plugin-prisma.svg)](https://www.npmjs.com/package/@joshuaavalon/fastify-plugin-prisma)
[![License](https://img.shields.io/github/license/joshuaavalon/fastify-plugin-prisma)](./LICENSE)

## Getting Started

```sh
npm i @joshuaavalon/fastify-plugin-prisma
```

## Usage

```typescript
import prismaPlugin from "@joshuaavalon/fastify-plugin-prisma";
await fastify.register(prismaPlugin, opts);

const user = await fastify.db.user.findFirst();
```

## Options

#### `url`

- Type: `string | undefined`
- Default: `undefined`

Database connection string. `undefined` uses url defined in `schema.prisma`.

#### `logLevel`

- Type: `Prisma.LogLevel[] | undefined`
- Default: `undefined`

Control which event to log. Default log all level.

#### `disableLogBindings`

- Type: `boolean | undefined`
- Default: `false`

Disable plugin in log bindings
