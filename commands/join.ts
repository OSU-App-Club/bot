import { Octokit } from "@octokit/rest";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { sendGithubInvite } from "../utils/github";

/**
 * Defines the /join github [username] slash command.
 */
export const joinGithubCommand = new SlashCommandBuilder()
  .setName("join")
  .setDescription("The join command group.")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("github")
      .setDescription("Join the GitHub organization.")
      .addStringOption((option) =>
        option
          .setName("username")
          .setDescription("Your GitHub username.")
          .setRequired(true)
      )
  );

/**
 * Handles the /join github command interaction.
 * @param interaction The command interaction.
 */
export async function handleJoinGithubCommand(
  interaction: CommandInteraction,
  octokit: Octokit
) {
  const username = interaction.options.get("username")?.value as string;

  if (!username) {
    await interaction.reply("Please provide your GitHub username.");
    return;
  }

  try {
    await sendGithubInvite(username, octokit);
    await interaction.reply({
      content: `Invitation sent to \`${username}\`. \n You can accept our invitation at the following link: <https://github.com/OSU-App-Club> **OR** by checking the email associated with your GitHub account.`,
      ephemeral: true,
    });
    return;
  } catch (error) {
    if (error instanceof Error) {
      await interaction.reply({
        content: `An error occurred while sending the invitation: ${error.message}`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "An unknown error occurred while sending the invitation.",
        ephemeral: true,
      });
      console.error(error);
    }
  }
}
