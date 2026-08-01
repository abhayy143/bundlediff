import * as core from '@actions/core';
import * as github from '@actions/github';
import { scanDirectory } from './scanner';
import { compareBundles } from './comparator';
import { formatMarkdownReport } from './formatter';

async function run() {
  try {
    const baseDir = core.getInput('base-dir');
    const prDir = core.getInput('pr-dir');
    const token = core.getInput('github-token');

    const octokit = github.getOctokit(token);
    const context = github.context;

    core.info('BundleDiff: Scanning build directories...');

    // 1. Scan both directories
    const baseFiles = scanDirectory(baseDir);
    const prFiles = scanDirectory(prDir);

    // 2. Compute comparison deltas and inspect dependencies
    const summary = compareBundles(baseFiles, prFiles);

    // 3. Format into a clean Markdown table
    const markdownReport = formatMarkdownReport(summary);

    // 4. Post comment to PR
    if (context.payload.pull_request) {
      await octokit.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.payload.pull_request.number,
        body: markdownReport
      });
      core.info('BundleDiff: Report posted successfully to PR!');
    } else {
      core.info('Not a Pull Request event, skipping comment.');
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`BundleDiff Action failed: ${error.message}`);
    }
  }
}

run();