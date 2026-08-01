import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

export interface ScannedFile {
  path: string;
  fileName: string;
  size: number;
  gzipSize: number;
  warnings: string[];
}

const IGNORED_FOLDERS = new Set(['.git', '.github', 'node_modules']);

export function scanDirectory(dirPath: string): ScannedFile[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const results: ScannedFile[] = [];

  function walk(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        if (IGNORED_FOLDERS.has(entry.name)) {
          continue;
        }
        walk(fullPath);
      } else if (entry.isFile()) {
        const content = fs.readFileSync(fullPath);
        const relativeFileName = path.relative(dirPath, fullPath).replace(/\\/g, '/');

        const warnings: string[] = [];
        if (relativeFileName.endsWith('.js') || relativeFileName.endsWith('.ts')) {
          const textContent = content.toString('utf-8');
          if (textContent.includes("require('moment')") || textContent.includes('from "moment"') || textContent.includes("from 'moment'")) {
            warnings.push('⚠️ Heavy Dependency: "moment" detected. Consider using "date-fns" or "dayjs".');
          }
          if (textContent.includes("require('lodash')") || textContent.includes('from "lodash"') || textContent.includes("from 'lodash'")) {
            warnings.push('⚠️ Heavy Dependency: "lodash" detected. Consider importing specific subpaths or native methods.');
          }
        }

        const gzipped = zlib.gzipSync(content);

        results.push({
          path: fullPath,
          fileName: relativeFileName,
          size: content.length,
          gzipSize: gzipped.length,
          warnings
        });
      }
    }
  }

  walk(dirPath);
  return results;
}