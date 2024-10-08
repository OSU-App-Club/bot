import { Client, Interaction } from "discord.js";
import { handleHelpCommand } from "../commands/help";

/**
 * Handles the 'interactionCreate' event.
 * @param client The Discord Client instance.
 */
export default function interactionCreateHandler(client: Client) {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "help") {
      await handleHelpCommand(interaction);
    }

    // TODO: More (/) command handlers
  });
}
