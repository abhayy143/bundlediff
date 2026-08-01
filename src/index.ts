import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const token = core.getInput('github-token');
    
    const octokit = github.getOctokit(token);
    const context = github.context;

    core.info('BundleDiff Action booted up!');

    if (context.payload.pull_request) {
      await octokit.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.payload.pull_request.number,
        body: '🚀 **BundleDiff** is active! (The byte comparison data will go here soon).'
      });
      core.info('Comment successfully posted to the PR!');
    } else {
      core.info('Not a Pull Request event, skipping comment.');
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`Action failed with error: ${error.message}`);
    }
  }
}

run();