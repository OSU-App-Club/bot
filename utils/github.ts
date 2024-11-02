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
  const githubMembersTeam = process.env.GITHUB_MEMBERS_TEAM;

  if (!githubOrg) {
    throw new Error("GitHub organization not found in environment variables.");
  }

  if (!githubMembersTeam) {
    throw new Error("GitHub members team not found in environment variables.");
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
      team_ids: [parseInt(githubMembersTeam)],
    });

    console.log(`Invite sent to ${githubUsername}`);
  } catch (error) {
    console.error(`Failed to send invite to ${githubUsername}: ${error}`);
    throw error;
  }
}

/**
 * Find all members in the GitHub organization not in the "members" team.
 * @param octokit Initialized Octokit instance.
 * @returns Array of usernames.
 * @throws Error if the GitHub organization is not found in environment variables.
 * @throws Error if the "members" team is not found.
 */
export async function findNonMembers(octokit: Octokit): Promise<string[]> {
  const githubOrg = process.env.GITHUB_ORG;
  const membersTeam = process.env.GITHUB_MEMBERS_TEAM;

  if (!githubOrg) {
    throw new Error("GitHub organization not found in environment variables.");
  }

  if (!membersTeam) {
    throw new Error("GitHub members team not found in environment variables.");
  }

  try {
    const members = await octokit.teams.listMembersInOrg({
      org: githubOrg,
      team_slug: membersTeam,
    });

    const memberIds = members.data.map((member) => member.id);

    const allMembers = await octokit.orgs.listMembers({
      org: githubOrg,
    });

    const nonMembers = allMembers.data.filter(
      (member) => !memberIds.includes(member.id)
    );

    return nonMembers.map((member) => member.login);
  } catch (error) {
    console.error(`Failed to find non-members: ${error}`);
    throw error;
  }
}

/**
 * Add a user to the "members" team in the GitHub organization.
 * @param githubUsername The GitHub username to add.
 * @param octokit Initialized Octokit instance.
 * @throws Error if the GitHub organization is not found in environment variables.
 * @throws Error if the "members" team is not found.
 * @throws Error if the user is not found.
 * @throws Error if the user is already a member of the team.
 */
export async function addMemberToTeam(
  githubUsername: string,
  octokit: Octokit
): Promise<void> {
  const githubOrg = process.env.GITHUB_ORG;
  const membersTeam = process.env.GITHUB_MEMBERS_TEAM;

  if (!githubOrg) {
    throw new Error("GitHub organization not found in environment variables.");
  }

  if (!membersTeam) {
    throw new Error("GitHub members team not found in environment variables.");
  }

  try {
    const user = await octokit.users.getByUsername({
      username: githubUsername,
    });
    const userId = user.data.id;

    await octokit.teams.addOrUpdateMembershipForUserInOrg({
      org: githubOrg,
      team_slug: membersTeam,
      username: githubUsername,
      role: "member",
    });

    console.log(`Added ${githubUsername} to the members team`);
  } catch (error) {
    console.error(
      `Failed to add ${githubUsername} to the members team: ${error}`
    );
    throw error;
  }
}
