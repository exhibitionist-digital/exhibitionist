import React, { useEffect, useState } from "react";
import Footer from "./components/footer.jsx";
import { Helmet } from "react-helmet";
import Index from "./pages/index.jsx";
import OS from "./pages/os.jsx";
import { Link, Route, Switch, useLocation } from "wouter";
import { SWRConfig } from "swr";
import ultraCache from "ultra/cache";
import Project from "./pages/project.jsx";

const options = (cache) => ({
  provider: () => ultraCache(cache),
  revalidateIfStale: false,
  revalidateOnMount: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  suspense: true,
});

const Ultra = ({ cache }) => {
  const [location] = useLocation();

  useEffect(() => {
    if (window.__ultraLoad) window.scrollTo(0, 0);
    else window.__ultraLoad = true;
  }, [location]);

  return (
    <SWRConfig value={options(cache)}>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="/style.css" />
        <title>Exhibitionist Digital</title>
        <meta
          name="description"
          content="Digital realities"
        />
      </Helmet>
      <div className="full">
        <Title />
        <Switch>
          <Route path="/">
            <Index />
          </Route>
          <Route path="/:slug" component={Project} />
          <Route>
            <img className="lost" src="/images/ex.jpg" />
          </Route>
        </Switch>
      </div>
      <Footer />
    </SWRConfig>
  );
};

export default Ultra;

const Title = () => {
  const [count, setCount] = useState(0);
  const name = "EXHIBITIONIST";
  const next = () => {
    setTimeout(() => {
      if (count >= name.length - 1) setCount(0);
      else setCount(count + 1);
    }, 1000);
  };
  useEffect(() => {
    next();
  }, [count]);
  return (
    <h1>
      <span>{name.split("")[count] || " "}</span>
      <span>{name.split("")[count + 1] || "E"}</span>
    </h1>
  );
};
