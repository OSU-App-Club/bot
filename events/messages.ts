import { Message, Client } from "discord.js";
import { Octokit } from "@octokit/rest";
import {
  getUserById,
  sendDirectMessage,
  reactToMessage,
} from "../utils/discord";
import { sendGithubInvite } from "../utils/github";
import { emojis } from "../constants";

/**
 * Handles the 'messageCreate' event.
 * @param message The message that was created.
 * @param client The Discord Client instance.
 * @param octokit Initialized Octokit instance.
 */
export default async function messageCreateHandler(
  message: Message,
  client: Client,
  octokit: Octokit
) {
  // Ignore messages from bots
  if (message.author.bot) return;

  const args = message.content.trim().split(/\s+/);
  if (
    args[0].toLowerCase() === "!join" &&
    args[1]?.toLowerCase() === "github"
  ) {
    const githubUsername = args[2];
    if (!githubUsername) {
      await message.reply(
        "Please provide a GitHub username. Usage: `!join github {username_here}`"
      );
      return;
    }
    try {
      const user = await getUserById(client, message.author.id);
      if (user) {
        await sendGithubInvite(githubUsername, octokit);
        await reactToMessage(message, emojis.success);
        await reactToMessage(message, emojis.confirm);
        await sendDirectMessage(
          user,
          `## 🎉 You have been invited to the App Development Club GitHub organization. 🎉
         *Please accept the invitation at the following link:* <https://github.com/OSU-App-Club>`
        );
      } else {
        await message.reply(
          "I couldn't find your user. Please enable direct messages from server members and try again."
        );
      }
    } catch (error) {
      console.error(error);
      await reactToMessage(message, emojis.error);
    }
  }
}
