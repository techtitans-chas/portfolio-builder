const allowed = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'https://starta.starlitepixels.com',
  'https://starta-api.starlitepixels.com',
  'http://0.0.0.0:3000',
  process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3111',
];

export const corsOptions = {
  origin: (origin: string) => (allowed.includes(origin) ? origin : null),
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};
