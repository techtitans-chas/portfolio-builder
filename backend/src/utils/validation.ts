import type { ZodError, ZodType } from 'zod';
import { badRequest } from './errorHandling.js';

export type ValidationIssue = {
  path: string;
  message: string;
  code: string;
};

export function formatZodIssues(error: ZodError): ValidationIssue[] {
  return error.issues.map(issue => ({
    path: issue.path.length > 0 ? issue.path.join('.') : 'body',
    message: issue.message,
    code: issue.code,
  }));
}

export function zodValidationHook(result: ReturnType<ZodType['safeParse']>) {
  if (!result.success) {
    throw badRequest('Validation failed', {
      issues: formatZodIssues(result.error),
    });
  }
}
