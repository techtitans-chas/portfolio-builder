import { backendEnvSchema, type BackendEnv } from '@portfolio-builder/shared/schemas';

export function validateBackendEnv(): BackendEnv {
  const result = backendEnvSchema.safeParse(process.env);

  if (!result.success) {
    const lines = result.error.issues
      .map(i => `  • ${i.path.join('.') || '(root)'} — ${i.message}`)
      .join('\n');
    console.error('❌  Missing or invalid environment variables:\n' + lines);
    console.error('\nCopy .env.example to .env and fill in the required values.');
    process.exit(1);
  }

  const { data } = result;
  const r2Vars = [data.R2_ACCOUNT_ID, data.R2_ACCESS_KEY_ID, data.R2_SECRET_ACCESS_KEY];
  if (r2Vars.some(Boolean) && !r2Vars.every(Boolean)) {
    console.warn(
      '⚠️  R2 credentials are partially set — file storage will be disabled.\n' +
        '   Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY to enable uploads.',
    );
  }

  if (!data.RESEND_API_KEY) {
    console.info('ℹ️  RESEND_API_KEY not set — email sending will be disabled.');
  }

  return data;
}
