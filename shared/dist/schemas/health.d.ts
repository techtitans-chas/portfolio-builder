import { z } from 'zod';
export declare const HealthResponseSchema: z.ZodObject<{
    status: z.ZodEnum<{
        healthy: "healthy";
        unhealthy: "unhealthy";
    }>;
    timestamp: z.ZodString;
    service: z.ZodString;
    version: z.ZodOptional<z.ZodString>;
    features: z.ZodOptional<z.ZodObject<{
        storage: z.ZodBoolean;
        email: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
//# sourceMappingURL=health.d.ts.map