import { Octokit } from "@octokit/rest";
import { serve } from "bun";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import interactionCreateHandler from "./events/interactions";
import messageCreateHandler from "./events/messages";
import logger from "./logger";

const requiredEnvVars = [
  "BOT_TOKEN",
  "GITHUB_TOKEN",
  "GUILD_ID_TEST",
  "GUILD_ID_PROD",
  "CLIENT_ID",
  "GITHUB_ORG",
];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    logger.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

// Event: Ready
client.once("ready", () => {
  if (!client.user) {
    logger.error("Client user is not available.");
    return;
  }
  logger.info(`${client.user.tag} is ready to serve!`);
});

// Handle interactions (slash commands)
interactionCreateHandler(client, octokit);

// Handle message-based commands
client.on("messageCreate", async (message) => {
  await messageCreateHandler(message, client, octokit);
});

// Graceful shutdown
process.on("SIGINT", () => {
  logger.info("Shutting down gracefully...");
  client.destroy();
  process.exit();
});

process.on("SIGTERM", () => {
  logger.info("Shutting down gracefully...");
  client.destroy();
  process.exit();
});

client.login(process.env.BOT_TOKEN);

serve({
  fetch: (req) => {
    const url = new URL(req.url);
    if (url.pathname === "/api/healthz") {
      return new Response("OK", { status: 200 });
    }
    return new Response("Not Found", { status: 404 });
  },
  port: process.env.PORT || 3001,
});

console.log(`Server running on port ${process.env.PORT || 3001}`);
