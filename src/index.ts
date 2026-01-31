import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

const app = new Hono();

app.use("*", cors());

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/api/hello", (c) => {
  const currentTime = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return c.json({ message: `Hello, World! #${currentTime}` });
});

app.get("/api/calculate", (c) => {
  const expression = c.req.query("expression");

  if (!expression) {
    return c.json({ error: "Missing expression parameter" }, 400);
  }

  // Safely evaluate simple arithmetic expressions
  // Only allow numbers, spaces, and basic operators
  const sanitized = expression.replace(/\s+/g, "");
  const validPattern = /^[\d+\-*/().]+$/;

  if (!validPattern.test(sanitized)) {
    return c.json({ error: "Invalid expression. Only numbers and operators (+, -, *, /, parentheses) are allowed" }, 400);
  }

  try {
    // Use Function constructor for safe evaluation (limited scope)
    const result = new Function(`'use strict'; return (${sanitized})`)();
    
    if (!Number.isFinite(result)) {
      return c.json({ error: "Result is not a valid number" }, 400);
    }

    return c.json({
      expression: expression,
      result: result
    });
  } catch (error) {
    return c.json({ error: "Invalid mathematical expression" }, 400);
  }
});

const port = 5174;
console.log(`🚀 Server starting on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
