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

// Calculator endpoint
app.get("/api/calculate", (c) => {
  const a = c.req.query("a");
  const b = c.req.query("b");
  const operation = c.req.query("operation") || "add";

  if (!a || !b) {
    return c.json(
      {
        error: "Missing required parameters: a and b",
      },
      400
    );
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return c.json(
      {
        error: "Invalid numbers provided",
      },
      400
    );
  }

  let result: number;
  switch (operation) {
    case "add":
      result = numA + numB;
      break;
    case "subtract":
      result = numA - numB;
      break;
    case "multiply":
      result = numA * numB;
      break;
    case "divide":
      if (numB === 0) {
        return c.json(
          {
            error: "Cannot divide by zero",
          },
          400
        );
      }
      result = numA / numB;
      break;
    default:
      return c.json(
        {
          error: "Invalid operation. Use: add, subtract, multiply, or divide",
        },
        400
      );
  }

  return c.json({
    a: numA,
    b: numB,
    operation,
    result,
    expression: `${numA} ${operation === "add" ? "+" : operation === "subtract" ? "-" : operation === "multiply" ? "×" : "÷"} ${numB} = ${result}`,
  });
});

const port = 5174;

console.log(`🚀 Server starting on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
