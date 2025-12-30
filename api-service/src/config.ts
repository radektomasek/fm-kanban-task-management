import "dotenv/config"
import { z } from "zod"

const configSchema = z.object({
  PORT: z.number().default(4000),
  HOST: z.string().default("0.0.0.0"),
  DATABASE_URL: z.string().optional(),
  LOG_LEVEL: z.string().default("info"),
})

export type Config = z.infer<typeof configSchema>

/**
 * @TODO: Add a better validation
 */
export const config: Config = {
  PORT: parseInt(process.env.PORT ?? "4000"),
  HOST: process.env.HOST ?? "0.0.0.0",
  DATABASE_URL: process.env.DATABASE_URL,
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
}
