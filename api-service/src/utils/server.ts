import Fastify, { FastifyReply, FastifyRequest } from "fastify";

export async function buildServer() {
  const fastify = Fastify({
    logger: true
  })
  
  
  return fastify
}