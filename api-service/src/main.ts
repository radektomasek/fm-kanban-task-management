import { config } from "./config"
import { ping, setupDB } from "./db"
import { buildServer } from "./utils/server"
import { logger } from "./utils/logger"

const { PORT, HOST } = config

async function main() {
  const { db } = await setupDB(config.DATABASE_URL)
  
  try {
    await ping(db);
    logger.info("database connected")
  } catch (error) {
    logger.error(error, "ping failed")
    process.exit(1)
  }
  
  /**
   * @TODO: pass the db parameter once ready.
   */
  const server = await buildServer()

  try {
    await server.listen({ port: PORT, host: HOST })
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
  
  logger.info(config, "using config")
  
  await server.ready()
  
  /**
   * @TODO: add Prometheus metrics
   */
}

main()