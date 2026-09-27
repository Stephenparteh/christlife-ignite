import { env } from "./config/env";
import { connectToDatabase } from "./config/db";
import { createApp } from "./app";

const start = async () => {
  await connectToDatabase();
  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`Christ Life API listening on port ${env.PORT} (${env.NODE_ENV})`);
  });
};

start().catch((error) => {
  console.error("Failed to start the server:", error instanceof Error ? error.message : error);
  process.exit(1);
});
