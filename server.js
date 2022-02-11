import ultra from "https://raw.githubusercontent.com/exhibitionist-digital/ultra/0.7.0/mod.ts";
import importmap from "./importmap.json" assert { type: "json" };

await ultra({
  importmap,
});
