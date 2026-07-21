import app from "./app";
import { env } from "./config/env";
import { prisma } from "@repo/database";

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 MACPROTEC Express API Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${env.NODE_ENV}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
  console.log(`==================================================`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`\n[Server] ${signal} signal received. Closing HTTP server...`);
  server.close(async () => {
    console.log("[Server] HTTP server closed. Disconnecting database...");
    await prisma.$disconnect();
    console.log("[Server] Database connection closed. Exiting process.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
