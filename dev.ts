import { compile } from "./mdx.ts";

await compile("./content");

/**
 * Now start the server
 */
// const server = Deno.run({
//   cmd: [
//     Deno.execPath(),
//     "run",
//     "-A",
//     "--location=http://localhost:8000",
//     "--reload",
//     "./server.tsx",
//   ],
// });

// await server.status();
