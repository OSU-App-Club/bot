import { Client, Message, User } from "discord.js";

/**
 * Fetches a Discord user by their ID.
 * @param client Discord Client instance.
 * @param userId ID of the user to fetch.
 * @returns User object or null if not found.
 */
export async function getUserById(
  client: Client,
  userId: string
): Promise<User | null> {
  try {
    return await client.users.fetch(userId);
  } catch {
    return null;
  }
}

/**
 * Sends a direct message to a user.
 * @param user The user to send the message to.
 * @param content The content of the message.
 */
export async function sendDirectMessage(
  user: User | string,
  content: string
): Promise<void> {
  if (user instanceof User) {
    await user.send(content);
  } else {
    throw new Error("User not found");
  }
}

/**
 * Reacts to a message with a specified emoji.
 * @param message The message to react to.
 * @param emoji The emoji to react with.
 */
export async function reactToMessage(
  message: Message,
  emoji: string
): Promise<void> {
  await message.react(emoji);
}
