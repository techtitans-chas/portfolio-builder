import { z } from 'zod';
export declare const backendEnvSchema: z.ZodObject<{
    PORT: z.ZodOptional<z.ZodString>;
    DATABASE_URL: z.ZodString;
    BETTER_AUTH_SECRET: z.ZodString;
    BETTER_AUTH_URL: z.ZodString;
    FRONTEND_URL: z.ZodString;
    RESEND_API_KEY: z.ZodOptional<z.ZodString>;
    R2_ACCOUNT_ID: z.ZodOptional<z.ZodString>;
    R2_ACCESS_KEY_ID: z.ZodOptional<z.ZodString>;
    R2_SECRET_ACCESS_KEY: z.ZodOptional<z.ZodString>;
    R2_BUCKET_NAME: z.ZodOptional<z.ZodString>;
    R2_PUBLIC_URL: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type BackendEnv = z.infer<typeof backendEnvSchema>;
export declare const frontendEnvSchema: z.ZodObject<{
    NUXT_PUBLIC_API_URL: z.ZodOptional<z.ZodString>;
    NUXT_API_URL: z.ZodOptional<z.ZodString>;
    FRONTEND_URL: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type FrontendEnv = z.infer<typeof frontendEnvSchema>;
//# sourceMappingURL=env.d.ts.map