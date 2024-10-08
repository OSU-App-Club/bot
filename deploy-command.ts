import { REST, Routes } from "discord.js";
import { commands } from "./commands/help";
import logger from "./logger";

const clientId = process.env.CLIENT_ID!;
const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN!);
const guildIds = {
  test: process.env.GUILD_ID_TEST!,
  production: process.env.GUILD_ID_PROD!,
};

(async () => {
  try {
    logger.info("Started refreshing application (/) commands.");

    // Deploy commands to Test Guild
    if (guildIds.test) {
      await rest.put(Routes.applicationGuildCommands(clientId, guildIds.test), {
        body: commands.map((cmd) => cmd.toJSON()),
      });
      logger.info(
        "Successfully reloaded application (/) commands for Test Guild."
      );
    }

    // Deploy commands to Production Guild
    if (guildIds.production) {
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildIds.production),
        { body: commands.map((cmd) => cmd.toJSON()) }
      );
      logger.info(
        "Successfully reloaded application (/) commands for Production Guild."
      );
    }

    logger.info("All slash commands have been deployed successfully.");
  } catch (error) {
    logger.error(`Failed to deploy commands: ${error}`);
  }
})();
