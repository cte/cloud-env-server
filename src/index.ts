import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

const app = new Hono();

app.use("*", cors());

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/api/hello", (c) => {
  const currentTime = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'long'
  });
  return c.json({ message: `Hello, World! #${currentTime}` });
});

const port = 5174;
console.log(`🚀 Server starting on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
