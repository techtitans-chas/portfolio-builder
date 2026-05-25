import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";

const app = new Hono();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type"],
  })
);

// Root endpoint
app.get("/", (c) => {
  return c.json({ message: "Backend API is running" });
});

// Health check endpoint
app.get("/health", (c) => {
  const healthResponse = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "portfolio-builder-backend",
    version: "0.1.0",
  };
  return c.json(healthResponse);
});

const port = 3001;
serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Backend server is running on http://localhost:${info.port}`);
  }
);
