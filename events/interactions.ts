import { Octokit } from "@octokit/rest";
import { Client, Interaction } from "discord.js";
import { handleHelpCommand } from "../commands/help";
import { handleJoinGithubCommand } from "../commands/join";

/**
 * Handles the 'interactionCreate' event.
 * @param client The Discord Client instance.
 */
export default function interactionCreateHandler(
  client: Client,
  octokit: Octokit
) {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "help") {
      await handleHelpCommand(interaction);
    }

    if (commandName === "join") {
      await handleJoinGithubCommand(interaction, octokit);
    }

    // TODO: More (/) command handlers
  });

  client.on("error", console.error);
}
