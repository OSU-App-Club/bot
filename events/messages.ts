import { Octokit } from "@octokit/rest";
import { Client, Message } from "discord.js";
import { emojis } from "../constants";
import {
  getUserById,
  reactToMessage,
  sendDirectMessage,
} from "../utils/discord";
import { sendGithubInvite } from "../utils/github";

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
  // Ignore messages that don't start with the prefix
  if (!message.content.startsWith("!")) return;

  const args = message.content.trim().split(/\s+/);

  if (
    args[0].toLowerCase() === "!join" &&
    args[1]?.toLowerCase() === "github"
  ) {
    const githubUsername = args[2];
    if (!githubUsername) {
      await reactToMessage(message, emojis.error);
      return;
    }
    try {
      const user = await getUserById(client, message.author.id);

      await sendGithubInvite(githubUsername, octokit);
      await reactToMessage(message, emojis.success);
      await reactToMessage(message, emojis.confirm);
      await sendDirectMessage(
        user ?? message.author,
        `I have sent you an invitation to the App Development Club GitHub organization. You can accept it at the following link: <https://github.com/OSU-App-Club>`
      );
    } catch (error) {
      console.error(error);
      await reactToMessage(message, emojis.error);
      return;
    }
  }
}
