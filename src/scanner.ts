import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

export interface FileStats {
  path: string;
  relativePath: string;
  size: number; 
  gzipSize: number;
  warnings: string[]; // <-- NEW: Array to hold any warnings we find
}

export function scanDirectory(directoryPath: string): FileStats[] {
  const results: FileStats[] = [];
  const files = fs.readdirSync(directoryPath, { recursive: true });

  for (const file of files) {
    const relativePath = file.toString();
    const fullPath = path.join(directoryPath, relativePath);
    const stat = fs.statSync(fullPath);

    if (stat.isFile()) {
      const fileBuffer = fs.readFileSync(fullPath);
      const gzippedBuffer = zlib.gzipSync(fileBuffer);
      
      // Dependency Inspector Logic
      const warnings: string[] = [];
      
     
      if (relativePath.endsWith('.js')) {
     
        const codeText = fileBuffer.toString('utf-8');
        
        
        if (codeText.includes('moment')) {
            warnings.push('⚠️ Heavy Dependency: "moment" detected. Consider using "date-fns" or "dayjs" instead.');
        }
        if (codeText.includes('lodash') && !codeText.includes('lodash-es')) {
            warnings.push('⚠️ Heavy Dependency: "lodash" detected. Ensure you are tree-shaking or use "lodash-es".');
        }
      }

      results.push({
        path: fullPath,
        relativePath: relativePath,
        size: stat.size,
        gzipSize: gzippedBuffer.length,
        warnings: warnings 
      });
    }
  }

  return results;
}
