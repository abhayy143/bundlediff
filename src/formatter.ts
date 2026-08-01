import { BundleDiffSummary } from './comparator';

export function formatMarkdownReport(summary: BundleDiffSummary): string {
  const sign = summary.totalDiffBytes >= 0 ? '+' : '';
  const totalChangeFormatted = `${sign}${summary.totalDiffBytes} bytes (${sign}${summary.totalPercentageChange}%)`;

  let markdown = `## 📦 BundleDiff Summary\n\n`;
  markdown += `* **Total Base Size:** \`${summary.totalBaseSize} bytes\`\n`;
  markdown += `* **Total PR Size:** \`${summary.totalPrSize} bytes\`\n`;
  markdown += `* **Total Change:** \`${totalChangeFormatted}\`\n\n`;

  markdown += `### 🔍 File Breakdown\n\n`;
  markdown += `| File Name | Base Gzip | PR Gzip | Delta | Change | Warnings |\n`;
  markdown += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  for (const file of summary.files) {
    const fileSign = file.diffBytes >= 0 ? '+' : '';
    const fileDelta = `${fileSign}${file.diffBytes} B`;
    const filePct = `${fileSign}${file.percentageChange}%`;
    const warningsText = file.warnings.length > 0 ? file.warnings.join('<br/>') : '✅ None';

    markdown += `| \`${file.fileName}\` | ${file.baseGzipSize} B | ${file.prGzipSize} B | ${fileDelta} | ${filePct} | ${warningsText} |\n`;
  }

  markdown += `\n---\n*Report generated automatically by **BundleDiff**.*`;

  return markdown;
}