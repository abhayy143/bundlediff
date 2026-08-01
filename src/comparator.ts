import { FileStats } from './scanner';

export interface FileDiff {
  fileName: string;
  baseGzipSize: number;
  prGzipSize: number;
  diffBytes: number;
  percentageChange: number;
  warnings: string[]; 
}

export interface BundleSummary {
  files: FileDiff[];
  totalBaseSize: number;
  totalPrSize: number;
  totalDiffBytes: number;
  totalPercentageChange: number;
}

export function compareBuilds(baseFiles: FileStats[], prFiles: FileStats[]): BundleSummary {
  const diffs: FileDiff[] = [];
  let totalBaseSize = 0;
  let totalPrSize = 0;

  for (const prFile of prFiles) {
    const baseFile = baseFiles.find(file => file.relativePath === prFile.relativePath);

    const baseSize = baseFile ? baseFile.gzipSize : 0;
    const prSize = prFile.gzipSize;
    const diffBytes = prSize - baseSize;

    let percentageChange = 0;
    if (baseSize === 0) {
      percentageChange = 100;
    } else {
      percentageChange = (diffBytes / baseSize) * 100;
    }

    totalBaseSize += baseSize;
    totalPrSize += prSize;

    diffs.push({
      fileName: prFile.relativePath,
      baseGzipSize: baseSize,
      prGzipSize: prSize,
      diffBytes: diffBytes,
      percentageChange: Number(percentageChange.toFixed(2)),
      warnings: prFile.warnings 
    });
  }

  const totalDiffBytes = totalPrSize - totalBaseSize;
  let totalPercentageChange = 0;
  if (totalBaseSize === 0 && totalPrSize > 0) {
      totalPercentageChange = 100;
  } else if (totalBaseSize > 0) {
      totalPercentageChange = (totalDiffBytes / totalBaseSize) * 100;
  }

  return {
    files: diffs,
    totalBaseSize,
    totalPrSize,
    totalDiffBytes,
    totalPercentageChange: Number(totalPercentageChange.toFixed(2))
  };
}