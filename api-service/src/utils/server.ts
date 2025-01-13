import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import type { DB } from "../db"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { projectRouter } from "../modules/project/project.router"
import { boardRouter } from "../modules/board/board.router"

declare module "fastify" {
  interface FastifyRequest {
    db: DB
  }
}

export async function buildServer({ db }: { db: DB }) {
  const fastify = Fastify({
    logger: true,
  })

  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)

  fastify.addHook("onRequest", async (request) => {
    request.db = db
  })

  fastify.after(() => {
    fastify.register(projectRouter, { prefix: "/v1/projects" })
    fastify.register(boardRouter, { prefix: "/v1/boards" })

    fastify.get("/healthcheck", async () => {
      return { status: "ok" }
    })
  })

  return fastify
}
