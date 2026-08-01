import { ScannedFile } from './scanner';

export interface FileComparison {
  fileName: string;
  baseGzipSize: number;
  prGzipSize: number;
  diffBytes: number;
  percentageChange: number;
  warnings: string[];
}

export interface BundleDiffSummary {
  totalBaseSize: number;
  totalPrSize: number;
  totalDiffBytes: number;
  totalPercentageChange: number;
  files: FileComparison[];
}

export function compareBundles(
  baseFiles: ScannedFile[],
  prFiles: ScannedFile[]
): BundleDiffSummary {
  const baseMap = new Map<string, ScannedFile>();
  baseFiles.forEach((file) => baseMap.set(file.fileName, file));

  const prMap = new Map<string, ScannedFile>();
  prFiles.forEach((file) => prMap.set(file.fileName, file));

  const allFileNames = Array.from(
    new Set([...baseMap.keys(), ...prMap.keys()])
  );

  let totalBaseSize = 0;
  let totalPrSize = 0;

  const fileComparisons: FileComparison[] = allFileNames.map((fileName) => {
    const baseFile = baseMap.get(fileName);
    const prFile = prMap.get(fileName);

    const baseGzipSize = baseFile ? baseFile.gzipSize : 0;
    const prGzipSize = prFile ? prFile.gzipSize : 0;

    totalBaseSize += baseGzipSize;
    totalPrSize += prGzipSize;

    const diffBytes = prGzipSize - baseGzipSize;
    const percentageChange =
      baseGzipSize === 0
        ? prGzipSize > 0
          ? 100
          : 0
        : Number(((diffBytes / baseGzipSize) * 100).toFixed(1));

    const warnings = prFile ? prFile.warnings : [];

    return {
      fileName,
      baseGzipSize,
      prGzipSize,
      diffBytes,
      percentageChange,
      warnings,
    };
  });

  const totalDiffBytes = totalPrSize - totalBaseSize;
  const totalPercentageChange =
    totalBaseSize === 0
      ? totalPrSize > 0
        ? 100
        : 0
      : Number(((totalDiffBytes / totalBaseSize) * 100).toFixed(1));

  return {
    totalBaseSize,
    totalPrSize,
    totalDiffBytes,
    totalPercentageChange,
    files: fileComparisons,
  };
}