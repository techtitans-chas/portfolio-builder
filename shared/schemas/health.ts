import { z } from 'zod';

export const HealthResponseSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  timestamp: z.string().datetime(),
  service: z.string(),
  version: z.string().optional(),
  features: z
    .object({
      storage: z.boolean(),
      email: z.boolean(),
    })
    .optional(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;
