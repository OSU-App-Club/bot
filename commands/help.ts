import { CommandInteraction, SlashCommandBuilder } from "discord.js";

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
  await interaction.reply({
    content: helpMessage,
    ephemeral: true,
  });
}

const helpMessage = `**Commands:**
- \`/help\`: See this help message.
- \`/join github {username}\`: Join the App Development Club GitHub organization.
`;
