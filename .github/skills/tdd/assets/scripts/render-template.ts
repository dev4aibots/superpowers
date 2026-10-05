/**
 * Template renderer for Superpowers skills
 * Replaces {{variable}} placeholders with provided values
 */

export interface TemplateVariables {
  [key: string]: string | number | boolean;
}

/**
 * Renders a template string by replacing {{variable}} placeholders
 * @param template - Template string with {{variable}} placeholders
 * @param variables - Object mapping variable names to values
 * @returns Rendered template string
 */
export function renderTemplate(template: string, variables: TemplateVariables): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = variables[key];
    return value !== undefined ? String(value) : `{{${key}}}`;
  });
}

/**
 * Renders a template file from disk
 * @param templatePath - Path to template file
 * @param variables - Variables to substitute
 * @returns Rendered template string
 */
export async function renderTemplateFile(
  templatePath: string,
  variables: TemplateVariables
): Promise<string> {
  const fs = await import('fs/promises');
  const template = await fs.readFile(templatePath, 'utf-8');
  return renderTemplate(template, variables);
}

/**
 * Validates that all required variables are provided
 * @param template - Template string
 * @param variables - Provided variables
 * @returns Array of missing variable names
 */
export function validateTemplateVariables(
  template: string,
  variables: TemplateVariables
): string[] {
  const requiredVars = new Set<string>();
  const matches = template.matchAll(/\{\{(\w+)\}\}/g);
  
  for (const match of matches) {
    requiredVars.add(match[1]);
  }
  
  return Array.from(requiredVars).filter(key => variables[key] === undefined);
}