import hydrate from "ultra/hydrate.js";
import App from "./src/app.tsx";

function ClientApp() {
  return <App />;
}

hydrate(document, <ClientApp />);
