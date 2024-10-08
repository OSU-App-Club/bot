import {
  Client,
  CommandInteraction,
  Message,
  SlashCommandBuilder,
  User,
} from "discord.js";

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

export async function sendDirectMessage(
  user: User,
  content: string
): Promise<void> {
  await user.send(content);
}

export async function reactToMessage(
  message: Message,
  emoji: string
): Promise<void> {
  await message.react(emoji);
}

export const joinGithubCommand = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Get help with the bot.");

export async function helpCommand(interaction: CommandInteraction) {
  await interaction.reply(
    "To join the GitHub organization, use the `/join github {username}` command."
  );
}

export const commands = [joinGithubCommand];

export async function handleCommands(client: Client) {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === joinGithubCommand.name) {
      await helpCommand(interaction);
    }
  });
}
