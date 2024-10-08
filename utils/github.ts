import { Octokit } from "@octokit/rest";

/**
 * Sends a GitHub invitation to a user.
 * @param githubUsername The GitHub username to invite.
 * @param octokit Initialized Octokit instance.
 */
export async function sendGithubInvite(
  githubUsername: string,
  octokit: Octokit
): Promise<void> {
  const githubOrg = process.env.GITHUB_ORG;

  if (!githubOrg) {
    throw new Error("GitHub organization not found in environment variables.");
  }

  try {
    // Fetch user details to get the user ID
    const user = await octokit.users.getByUsername({
      username: githubUsername,
    });
    const userId = user.data.id;

    // Create an invitation to the organization
    await octokit.orgs.createInvitation({
      org: githubOrg,
      invitee_id: userId,
      role: "direct_member",
    });

    console.log(`Invite sent to ${githubUsername}`);
  } catch (error) {
    console.error(`Failed to send invite to ${githubUsername}: ${error}`);
    throw error;
  }
}
