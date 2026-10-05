/**
 * Skill debugger utility for Superpowers
 * Provides debugging capabilities for skill development
 */

import { resolve } from 'path';
import { existsSync } from 'fs';

export interface DebugOptions {
  verbose?: boolean;
  breakOnStart?: boolean;
}

export interface DebugResult {
  success: boolean;
  output?: unknown;
  error?: Error;
  duration: number;
  logs: DebugLog[];
}

export interface DebugLog {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}

/**
 * Debug a skill by running it with enhanced logging
 * @param skillName - Name of the skill to debug
 * @param input - Input data for the skill
 * @param options - Debug options
 * @returns Debug result with logs and output
 */
export async function debugSkill(
  skillName: string,
  input: Record<string, unknown> = {},
  options: DebugOptions = {}
): Promise<DebugResult> {
  const { verbose = false, breakOnStart = false } = options;
  const logs: DebugLog[] = [];
  const startTime = Date.now();

  const log = (level: DebugLog['level'], message: string, context?: Record<string, unknown>) => {
    const entry: DebugLog = { level, message, timestamp: new Date(), context };
    logs.push(entry);
    if (verbose || level === 'error' || level === 'warn') {
      console[level](`[${skillName}] ${message}`, context ?? '');
    }
  };

  log('info', `Starting debug session for skill: ${skillName}`, { input });

  if (breakOnStart) {
    log('debug', 'Break on start enabled - attach debugger now');
    // In real usage, this would be a debugger statement
    // debugger;
  }

  try {
    // Validate skill exists
    const skillPath = resolve(process.cwd(), '.github', 'skills', skillName);
    if (!existsSync(skillPath)) {
      throw new Error(`Skill not found: ${skillName} at ${skillPath}`);
    }
    log('debug', `Skill path validated: ${skillPath}`);

    // Load skill metadata
    const skillMetadata = await loadSkillMetadata(skillPath);
    log('debug', 'Skill metadata loaded', skillMetadata);

    // Validate front matter
    const frontMatterValidation = validateFrontMatter(skillMetadata.frontMatter);
    if (!frontMatterValidation.valid) {
      log('warn', 'Front matter validation issues', { issues: frontMatterValidation.issues });
    } else {
      log('debug', 'Front matter validation passed');
    }

    // Check assets
    const assets = await inspectAssets(skillPath);
    log('debug', 'Assets inspected', { assetCounts: assets.counts });

    // Simulate skill execution (in real implementation, this would run the actual skill)
    log('info', 'Executing skill...', { input });
    
    // This is where the actual skill logic would run
    // For now, we return a mock successful result
    const output = { 
      skill: skillName, 
      processed: true, 
      input,
      timestamp: new Date().toISOString()
    };

    log('info', 'Skill execution completed', { output });

    return {
      success: true,
      output,
      duration: Date.now() - startTime,
      logs
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    log('error', 'Skill execution failed', { error: err.message, stack: err.stack });
    
    return {
      success: false,
      error: err,
      duration: Date.now() - startTime,
      logs
    };
  }
}

/**
 * Load skill metadata from SKILL.md
 */
async function loadSkillMetadata(skillPath: string): Promise<{
  frontMatter: Record<string, unknown>;
  content: string;
}> {
  const fs = await import('fs/promises');
  const skillMdPath = resolve(skillPath, 'SKILL.md');
  const content = await fs.readFile(skillMdPath, 'utf-8');
  
  // Parse front matter
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const frontMatter = frontMatterMatch 
    ? parseYaml(frontMatterMatch[1]) 
    : {};
  
  return { frontMatter, content };
}

/**
 * Simple YAML parser for front matter
 */
function parseYaml(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = yaml.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      let value = match[2].trim();
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      result[match[1]] = value;
    }
  }
  
  return result;
}

/**
 * Validate skill front matter
 */
function validateFrontMatter(frontMatter: Record<string, unknown>): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  if (!frontMatter.name) {
    issues.push('Missing required field: name');
  }
  
  if (!frontMatter.description) {
    issues.push('Missing required field: description');
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Inspect skill assets directory
 */
async function inspectAssets(skillPath: string): Promise<{
  counts: Record<string, number>;
  files: string[];
}> {
  const fs = await import('fs/promises');
  const assetsPath = resolve(skillPath, 'assets');
  const files: string[] = [];
  const counts: Record<string, number> = {
    templates: 0,
    scripts: 0,
    references: 0
  };

  async function walk(dir: string, prefix = '') {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = resolve(dir, entry.name);
        const relPath = prefix + entry.name;
        
        if (entry.isDirectory()) {
          await walk(fullPath, relPath + '/');
        } else {
          files.push(relPath);
          if (relPath.startsWith('templates/')) counts.templates++;
          else if (relPath.startsWith('scripts/')) counts.scripts++;
          else if (relPath.startsWith('references/')) counts.references++;
        }
      }
    } catch {
      // Directory doesn't exist
    }
  }

  await walk(assetsPath);
  return { counts, files };
}