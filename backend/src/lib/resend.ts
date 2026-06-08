import { Resend } from 'resend';

export const resendEnabled = Boolean(process.env.RESEND_API_KEY);

export const resend = resendEnabled ? new Resend(process.env.RESEND_API_KEY) : null;
