import * as core from '@actions/core';
import * as github from '@actions/github';
import { createClient } from '@supabase/supabase-js';
import { scanDirectory } from './scanner';
import { compareBundles } from './comparator';
import { formatMarkdownReport } from './formatter';

async function run() {
  try {
  
    const baseDir = core.getInput('base-dir');
    const prDir = core.getInput('pr-dir');
    const token = core.getInput('github-token');
    const supabaseUrl = core.getInput('supabase-url');
    const supabaseKey = core.getInput('supabase-key');

   
    const octokit = github.getOctokit(token);
    const context = github.context;
    const supabase = createClient(supabaseUrl, supabaseKey);

    core.info('BundleDiff: Scanning build directories...');


    const baseFiles = scanDirectory(baseDir);
    const prFiles = scanDirectory(prDir);
    const summary = compareBundles(baseFiles, prFiles);
    const markdownReport = formatMarkdownReport(summary);


    core.info('BundleDiff: Saving stats to database...');
    const { error: dbError } = await supabase
      .from('repositories')
      .upsert({
        repo_owner: context.repo.owner,
        repo_name: context.repo.repo,
        main_bundle_size: summary.totalPrSize
      }, { onConflict: 'repo_owner,repo_name' });

    if (dbError) {
      core.warning(`Failed to save to database: ${dbError.message}`);
    } else {
      core.info('BundleDiff: Successfully saved to Supabase!');
    }

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