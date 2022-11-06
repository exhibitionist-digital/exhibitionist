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
  const requestUrl = resolveUrl(context.req);

  return <App root={requestUrl.origin} />;
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

const resolveUrl = (req: Request) => {
  const requestUrl = new URL(req.url);
  // Reverse proxy servers (load balancers, CDNs, etc.) may have forwarded
  // the original client request using a different protocol or host. E.g.
  // Fly.io forwards `https:` requests to the deployed server using `http:`.
  const headerXForwardedProto = req.headers.get("x-forwarded-proto");
  if (headerXForwardedProto) {
    requestUrl.protocol = headerXForwardedProto + ":";
  }
  const headerXForwardedHost = req.headers.get("x-forwarded-host");
  if (headerXForwardedHost) {
    requestUrl.hostname = headerXForwardedHost;
  }
  return requestUrl;
};
