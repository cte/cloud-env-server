Roo Code Cloud configuration:

```yml
name: Vite React App
description: A test environment for an application that uses a traditional client (React) and server (Hono) architecture.
ports:
  - name: WEB
    port: 5173
  - name: API
    port: 5174
repositories:
  - repository: cte/cloud-env-client
    commands:
      - name: Install dependencies
        run: pnpm install
      - name: Start web server in background
        run: pnpm dev
        detached: true
        logfile: /tmp/cloud-env-client.log
  - repository: cte/cloud-env-server
    commands:
      - name: Install dependencies
        run: pnpm install
      - name: Start API server in background
        run: pnpm dev
        detached: true
        logfile: /tmp/cloud-env-server.log
```
