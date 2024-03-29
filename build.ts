import { createBuilder } from "ultra/build.ts";
import { compile } from "./mdx.ts";

await compile("./content");

const builder = createBuilder({
  browserEntrypoint: import.meta.resolve("./client.tsx"),
  serverEntrypoint: import.meta.resolve("./server.tsx"),
});

builder.ignore([
  "./README.md",
  "./importMap.json",
]);

// deno-lint-ignore no-unused-vars
const result = await builder.build();
