import { Octokit } from "@octokit/rest";

export async function sendGithubInvite(githubUsername: string, octokit: Octokit) {
  const githubOrg = process.env.GITHUB_ORG;

  if (!githubOrg) {
    throw new Error("GitHub organization not found in environment variables.");
  }

  try {
    const user = await octokit.users.getByUsername({
      username: githubUsername,
    });
    const userId = user.data.id;
    await octokit.orgs.createInvitation({
      org: githubOrg,
      invitee_id: userId,
      role: "direct_member",
    });
    console.log(`Invite sent to ${githubUsername}`);
  } catch (error) {
    throw new Error(
      `Failed to invite ${githubUsername} to the organization: ${JSON.stringify(
        error
      )}`
    );
  }
}