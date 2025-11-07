/**
 * Environment variable loading utility
 * Loads .env.local and .env files from project root
 */

import { config as loadEnv } from "dotenv";
import path from "path";
import { existsSync } from "fs";

/**
 * Get project root directory
 * Works whether running from source or compiled
 */
function getProjectRoot(): string {
  // Try to find root by looking for package.json and pnpm-workspace.yaml
  let currentDir = process.cwd();
  const maxDepth = 10;
  let depth = 0;

  while (depth < maxDepth) {
    try {
      const packageJsonPath = path.join(currentDir, "package.json");
      const workspacePath = path.join(currentDir, "pnpm-workspace.yaml");
      
      // Check if we're at the root (has both package.json and pnpm-workspace.yaml)
      if (
        existsSync(packageJsonPath) &&
        existsSync(workspacePath)
      ) {
        return currentDir;
      }
      
      // Move up one directory
      const parent = path.dirname(currentDir);
      if (parent === currentDir) {
        break; // Reached filesystem root
      }
      currentDir = parent;
      depth++;
    } catch {
      break;
    }
  }

  // Fallback to process.cwd() if we can't find root
  return process.cwd();
}

/**
 * Load environment variables from project root
 */
export function loadEnvironmentVariables(): void {
  const projectRoot = getProjectRoot();
  
  // Load .env.local first (has priority)
  loadEnv({ path: path.join(projectRoot, ".env.local") });
  
  // Then load .env (fallback)
  loadEnv({ path: path.join(projectRoot, ".env") });
  
  // Also try current directory as fallback
  loadEnv();
}
