import { Client, GatewayIntentBits, Partials } from "discord.js";
import { Octokit } from "@octokit/rest";
import messageCreateHandler from "./events/messages";
import interactionCreateHandler from "./events/interactions"
import logger from "./logger";

// Validate required environment variables
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

// Initialize Octokit for GitHub interactions
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Create a new Discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel], // Needed to receive DMs
});

// Event: Ready
client.once("ready", () => {
  if (!client.user) {
    logger.error("Client user is not available.");
    return;
  }
  logger.info(`Logged in as ${client.user.tag}`);
});

// Handle interactions (slash commands)
interactionCreateHandler(client);

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

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);
