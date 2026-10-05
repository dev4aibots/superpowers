#!/usr/bin/env node
/**
 * Debug script template for Superpowers skills
 * Usage: npx tsx debug-script.ts --skill <skill-name> [options]
 */

import { program } from 'commander';
import { debugSkill } from '../scripts/debug-skill';

program
  .name('debug-skill')
  .description('Debug a Superpowers skill')
  .requiredOption('-s, --skill <name>', 'Skill name to debug')
  .option('-i, --input <data>', 'Input data for skill (JSON)')
  .option('-o, --output <expected>', 'Expected output (JSON)')
  .option('-v, --verbose', 'Enable verbose logging')
  .option('--break', 'Pause at start for debugger attachment');

program.parse();

const options = program.opts();

async function main() {
  const skillName = options.skill;
  const input = options.input ? JSON.parse(options.input) : {};
  const expectedOutput = options.output ? JSON.parse(options.output) : undefined;
  const verbose = options.verbose ?? false;
  const shouldBreak = options.break ?? false;

  if (shouldBreak) {
    console.log('Debugger pause - attach now');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`[debug] Starting debug session for skill: ${skillName}`);
  console.log(`[debug] Input:`, JSON.stringify(input, null, 2));

  try {
    const result = await debugSkill(skillName, input, { verbose });
    
    console.log(`[debug] Result:`, JSON.stringify(result, null, 2));
    
    if (expectedOutput) {
      const matches = JSON.stringify(result) === JSON.stringify(expectedOutput);
      console.log(`[debug] Expected match: ${matches ? '✅ PASS' : '❌ FAIL'}`);
      if (!matches) {
        console.log(`[debug] Expected:`, JSON.stringify(expectedOutput, null, 2));
        process.exit(1);
      }
    }
    
    console.log(`[debug] Debug session completed successfully`);
  } catch (error) {
    console.error(`[debug] Error:`, error);
    process.exit(1);
  }
}

main();