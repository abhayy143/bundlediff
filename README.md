
# BundleDiff 📦⚡

BundleDiff is a lightweight, zero-config CI/CD tool that automatically calculates gzipped build sizes, detects heavy dependencies, and posts bundle delta reports directly to your Pull Requests.

It also connects seamlessly to a global Edge API to generate real-time, auto-updating SVG badges for your repository README.

# ✨ Features

* 📊 PR Delta Reports: Posts a detailed markdown table to every Pull Request showing size changes in KB/MB.

* 🚨 Bloat Warning: Highlights unexpected build size spikes before merging to production.

* 🛡️ Database-Backed Tracking: Stores main branch build metrics securely in Supabase.

* 🏷️ Dynamic SVG Badges: Displays your repo's bundle size in real-time via an Edge API.

# 🚀 Quick Start

Add the BundleDiff step to your existing GitHub Actions workflow `(e.g., .github/workflows/bundle-check.yml)`:

```
name: Check Bundle Size

on:
  pull_request:
    branches:
      - main

jobs:
  bundle-analysis:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Build Project
        run: |
          npm ci
          npm run build

      - name: Run BundleDiff
        uses: abhayy143/bundlediff@v1.0.0
        with:
          base-dir: './build-base'
          pr-dir: './build-pr'
          github-token: ${{ secrets.GITHUB_TOKEN }}
          supabase-url: ${{ secrets.SUPABASE_URL }}
          supabase-key: ${{ secrets.SUPABASE_KEY }}

```

# ⚙️ Action Inputs


| Input | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `github-token` | **Yes** | N/A | `secrets.GITHUB_TOKEN` for posting comments on PRs. |
| `supabase-url` | **Yes** | N/A | Your Supabase project URL. |
| `supabase-key` | **Yes** | N/A | Your Supabase `service_role` key (for writing stats). |
| `base-dir` | No | `./build-base` | Directory containing the base/main build files. |
| `pr-dir` | No | `./build-pr` | Directory containing the PR build files. |


# 🏷️ Adding the Dynamic Badge

To show off your lightweight bundle on your repository README, add the following snippet:

```[![BundleDiff](https://bundlediff.vercel.app/api/badge?owner=YOUR_GITHUB_USERNAME&repo=YOUR_REPO_NAME)](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME)```



[![BundleDiff](https://bundlediff.vercel.app/api/badge?owner=abhayy143&repo=bundlediff)](https://github.com/abhayy143/bundlediff)
