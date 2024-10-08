import { SlashCommandBuilder, CommandInteraction } from "discord.js";

/**
 * Defines the /help slash command.
 */
export const helpCommand = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Get help with the bot.");

/**
 * Handles the /help command interaction.
 * @param interaction The command interaction.
 */
export async function handleHelpCommand(interaction: CommandInteraction) {
  await interaction.reply(
    "To join the GitHub organization, use the `/join github {username}` command."
  );
}

/**
 * Collection of all commands.
 * Want a new command? Add it here.
 */
export const commands = [helpCommand];
