export function extractGitHubRepoPath(url) {
    if (!url) return null;
    const match = url.match(
      /^https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/
    );
    if (!match || !(match.groups?.owner && match.groups?.name)) return null;
    return {username: match.groups.owner, repository: match.groups.name};
}
