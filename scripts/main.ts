import { Command } from "commander";
import { emojiMap } from "../constants";

const program = new Command();

function printEmojiList() {
  console.log("Available Emojis:");
  for (const [type, emoji] of Object.entries(emojiMap)) {
    console.log(`${type}: ${emoji}`);
  }
}

program
  .name("emoji-cli")
  .description("CLI for displaying available emojis")
  .version("1.0.0");

program
  .command("emoji-list")
  .description("Print the list of available emojis")
  .action(() => {
    printEmojiList();
  });

program.parse(process.argv);
