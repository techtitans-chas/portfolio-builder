import { createFactory } from 'hono/factory';
import type { AppEnv } from '../utils/auth.js';

export const factory = createFactory<AppEnv>();
