import { readFileSync, writeFileSync } from "fs";
import { argv } from "process";
import { emojiMap } from "../constants";

// Ensuring the commit message path is provided
if (argv.length < 3) {
  console.error("Error: Commit message file path is missing.");
  process.exit(1);
}

const commitMsgPath = argv[2];

try {
  // Read the existing commit message
  let commitMsg = readFileSync(commitMsgPath, "utf8").trim();

  // Assuming Conventional Commits format: [type]: [message]
  const commitTypeMatch = commitMsg.match(
    /^(feat|fix|docs|style|refactor|test|chore)(\(\w+\))?:\s.+/i
  );
  let emoji = "📦 "; // Default emoji if no type matches

  if (commitTypeMatch) {
    const type = commitTypeMatch[1].toLowerCase();
    emoji = emojiMap[type] || "📦 ";
  }

  // Check if the commit message already starts with an emoji
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s/u;
  if (!emojiRegex.test(commitMsg)) {
    // Prepend the emoji
    commitMsg = `${emoji}${commitMsg}`;
    // Write the modified commit message back to the file
    writeFileSync(commitMsgPath, commitMsg + "\n", "utf8");
    console.log(
      `\n ✅ Added ${emoji} to your commit message. \n\n   ⬇️  ⬇️  ⬇️   \n`
    );
  } else {
    console.log("✅ Your commit message already contains an emoji.");
  }
} catch (error) {
  console.error("❌ Failed to add emoji to commit message:", error);
  process.exit(1);
}
