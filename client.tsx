import hydrate from "ultra/hydrate.js";
import App from "./src/app.tsx";

// Twind
import "./src/twind/twind.ts";

function ClientApp() {
  return <App />;
}

hydrate(document, <ClientApp />);
