# osuapp.bot

This project is a Discord bot designed to manage GitHub organization invitations for our club. It listens for specific commands in our club Discord channels and sends GitHub organization invites to users based on their GitHub usernames.

> Down the line, we plan to add more features to the bot, such as GitHub repository creation, issue tracking, and more.
> 
> But for now, the bot is focused on managing GitHub organization invitations.

## Table of Contents

- [Installation](#installation)
- [Running the Bot](#running-the-bot)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Commands](#commands)
- [Scripts](#scripts)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Installation

To install the dependencies, run:

```
bun install
```

## Running the Bot

To start the bot, run:

```
bun start
```

## Environment Variables

The bot requires several environment variables to function correctly. Ensure you have a `.env` file with the following variables:

- `BOT_TOKEN`: Your Discord bot token.
- `GITHUB_TOKEN`: Your GitHub personal access token.
- `GUILD_ID_TEST`: The ID of your test guild (Discord server).
- `GUILD_ID_PROD`: The ID of your production guild (Discord server).
- `CLIENT_ID`: Your Discord client ID.
- `GITHUB_ORG`: The name of your GitHub organization.

## Project Structure

### Key Files and Directories

- `client.ts`: The main entry point for the bot. Initializes the Discord client and sets up event handlers.
- `commands/`:
  - `help.ts`: handler for the help command.
  - `join.ts`: handler for the join command.
  - `main.ts`: main command handler.
- `constants.ts`: constant values used throughout the project.
- `events/`: 
  - `interactions.ts`: interaction events (e.g., slash commands).
  - `messages.ts`: message events.
- `logger.ts`: winston logger instance.
- `scripts/`: 
  - `add-emoji.ts`: add emojis 🍦 to commits.
  - `deploy-commands.ts`: deploy slash commands.
  - `main.ts`: cli entry point.
- `utils/`: 
  - `discord.ts`: discord operations.
  - `github.ts`: github operations.

## Commands

- `!join github {username}`: Invites the specified GitHub username to the GitHub organization.

## Scripts

### Deploy Commands

To deploy slash commands, run:

```
bun deploy
```

### Start Bot

To start the bot, run:

```
bun start
```

> [!TIP]
> To see the commit lint emojis, run:
> ```
>  bun commit-help
> ```

## Logging

The project uses Winston for logging. The logger configuration is located in `logger.ts`.

> [!NOTE]
> `logger` traces are written to `bot.log`

## License

This project is licensed under the MIT License.

## Contributing

As always, contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgements

This project was created using `bun init` in `bun v1.0.19`. Bun is a fast all-in-one JavaScript runtime.
