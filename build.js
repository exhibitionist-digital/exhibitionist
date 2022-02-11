import build from "https://raw.githubusercontent.com/exhibitionist-digital/ultra/0.7.0/src/deno/build.ts";
import importmap from "./importmap.json" assert { type: "json" };

await build({
  importmap,
  root: "https://exhibitionist.digital",
});
