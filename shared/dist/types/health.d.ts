export interface HealthResponse {
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    service: string;
    version?: string;
    db: 'connected' | 'unreachable';
}
//# sourceMappingURL=health.d.ts.map