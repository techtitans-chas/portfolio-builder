import { badRequest } from "./errorHandling.js";

export type ValidationIssue = {
  path: string;
  message: string;
  code: string;
};

type ValidatorIssue = {
  path?: Array<string | number>;
  message?: string;
  code?: string;
};

type ValidatorError = {
  issues?: ValidatorIssue[];
};

export function formatZodIssues(error: ValidatorError): ValidationIssue[] {
  const issues = error.issues ?? [];
  return issues.map((issue) => ({
    path: issue.path && issue.path.length > 0 ? issue.path.join(".") : "body",
    message: issue.message ?? "Invalid value",
    code: issue.code ?? "invalid",
  }));
}

export function zodValidationHook(result: any) {
  const isFailure = Boolean(result && result.success === false);
  const error = (result?.error ?? undefined) as ValidatorError | undefined;

  if (isFailure && error) {
    throw badRequest("Validation failed", {
      issues: formatZodIssues(error),
    });
  }
}
