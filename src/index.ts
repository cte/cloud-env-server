import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

const app = new Hono();

// Enable CORS for the client app
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

// Main API endpoint
app.get("/api/hello", (c) => {
  const currentTime = new Date().toISOString();
  return c.json({
    message: `Hello, World! #${currentTime}`,
  });
});

const port = 5174;

console.log(`🚀 Server starting on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
