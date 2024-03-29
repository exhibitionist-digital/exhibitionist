import useAsset from "ultra/hooks/use-asset.js";
import {
  ACMI,
  DarkMofo,
  Jag,
  Mona,
  MonaFoma,
  PCP,
  Powerhouse,
  Rising,
  SOH,
} from "./logos.tsx";
import { MDXProvider } from "@mdx-js/react";
import Content from "./content/home.js";

const Link = ({ href, children }) => {
  return (
    <a href={href} target="_blank">
      {children}
    </a>
  );
};

export default function App({ root }) {
  const title = "Exhibitionist Digital";
  const description =
    "Providing digital realities for artists, museums + festivals";
  const image = useAsset("/ex.webp");
  return (
    <MDXProvider
      components={{
        a: Link,
      }}
    >
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <link rel="shortcut icon" href={useAsset("/favicon.ico")} />
          <link rel="stylesheet" href={useAsset("/style.css")} />
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta
            property="og:image"
            content={root + image}
          />
          <meta
            property="twitter:image"
            content={root + image}
          />
        </head>
        <body>
          <main>
            <section
              id="bg"
              style={{
                backgroundImage: `url(${useAsset("/construction.webp")})`,
              }}
            >
              <section
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,1))",
                  position: "absolute",
                  top: 0,
                }}
              >
              </section>
              <div
                style={{
                  mixBlendMode: "screen",
                  backgroundAttachment: "fixed",
                  zIndex: 0,
                  backgroundColor: "white",
                }}
              >
                <figure
                  style={{
                    mixBlendMode: "multiply",
                    backgroundPosition: "center",
                    background: "black",
                    backgroundAttachment: "fixed",
                    position: "absolute",
                    backgroundImage: `url(${useAsset("/2.webp")})`,
                    backgroundSize: "clamp(1em, 100vmin, 80vw)",
                  }}
                >
                </figure>
                <figure
                  id="ex"
                  style={{
                    zIndex: 3,
                    backgroundImage: `url(${useAsset("/ex.svg")})`,
                    backgroundSize: "70vmin",
                    mixBlendMode: "multiply",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "black",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed",
                      backgroundColor: "black",
                      width: "100%",
                      height: "100%",
                      mixBlendMode: "overlay",
                      position: "relative",
                      zIndex: 3,
                      backgroundImage:
                        "linear-gradient(45deg,#333 40%,#ddd 60%,#333)",
                    }}
                  >
                  </div>
                </figure>
              </div>
            </section>
            <section id="content">
              <Content />
            </section>
            <div id="logos">
              <ACMI />
              <DarkMofo />
              <Jag />
              <Mona />
              <MonaFoma />
              <PCP />
              <Powerhouse />
              <Rising />
              <SOH />
            </div>
          </main>
          <footer>
            <p>I am a man, a simple man, a man of colours</p>
            <p>
              And I can see, see through the years, years of a man, a man of
              colours
            </p>
            <p>
              <strong>
                &mdash;{" "}
                <a href="https://youtu.be/p9p4a7XXa4k?t=295" target="_blank">
                  <em>Iva Davies</em>, Icehouse
                </a>
              </strong>
            </p>
          </footer>
          <a rel="me" href="https://merveilles.town/@mutualrespect" />
        </body>
      </html>
    </MDXProvider>
  );
}
