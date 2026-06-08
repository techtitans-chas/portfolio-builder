import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db/client.js';
import * as schema from '../db/schema/index.js';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: Boolean(process.env.RESEND_API_KEY),
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      const { resend } = await import('./resend.js');
      if (!resend) return;
      await resend.emails.send({
        from: 'Portfolio Builder <onboarding@resend.dev>',
        to: user.email,
        subject: 'Reset your password',
        html: `<p>Click the link below to reset your password. This link expires in 1 hour.</p><p><a href="${url}">${url}</a></p>`,
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const { resend } = await import('./resend.js');
      if (!resend) return;
      await resend.emails.send({
        from: 'Portfolio Builder <onboarding@resend.dev>',
        to: user.email,
        subject: 'Verify your email address',
        html: `<p>Click the link below to verify your email address:</p><p><a href="${url}">${url}</a></p>`,
      });
    },
    sendOnSignUp: true,
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL ?? 'http://localhost:3111',
    process.env.FRONTEND_URL ?? 'http://localhost:3000',
    'http://0.0.0.0:3000',
  ],
});

export type Auth = typeof auth;
