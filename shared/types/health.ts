export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  service: string;
  version?: string;
}
