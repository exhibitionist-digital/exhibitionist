import { serve } from "https://deno.land/std@0.159.0/http/server.ts";
import { createRouter, createServer } from "ultra/server.ts";
import App from "./src/app.tsx";

// Twind
import "./src/twind/twind.ts";

const server = await createServer({
  importMapPath: import.meta.resolve("./importMap.json"),
  browserEntrypoint: import.meta.resolve("./client.tsx"),
});

function ServerApp({ context }: any) {
  const requestUrl = new URL(context.req.url);

  return <App />;
}

server.get("*", async (context) => {
  /**
   * Render the request
   */
  const result = await server.render(<ServerApp context={context} />, {
    disableHydration: false,
  });

  return context.body(result, 200, {
    "content-type": "text/html; charset=utf-8",
  });
});

if (import.meta.main) {
  serve(server.fetch);
}
export default server;
