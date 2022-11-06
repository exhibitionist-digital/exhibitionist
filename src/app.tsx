import useAsset from "ultra/hooks/use-asset.js";
import { ACMI, DarkMofo, Jag, Mona, MonaFoma, Rising } from "./logos.tsx";
// Twind
import { TwindProvider } from "./twind/TwindProvider.tsx";
import { tw } from "twind";
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
    <TwindProvider>
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
                className={tw(" bg-cover")}
              >
                <section
                  className={tw("absolute top-0")}
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,1))",
                  }}
                >
                </section>
                <div
                  className={tw("mix-blend-screen bg-fixed z-0 bg-black")}
                  style={{
                    backgroundImage:
                      `linear-gradient(125deg,#f09 30%,#fc8b00,#ff0,#00ff8a,#00cfff,#cc4cfa 70%)`,
                  }}
                >
                  <figure
                    className={tw(
                      " mix-blend-multiply bg-center bg-black absolute",
                    )}
                    style={{
                      backgroundImage: `url(${useAsset("/texture.webp")})`,
                      backgroundSize: "clamp(1em, 100vmin, 50em)",
                    }}
                  >
                  </figure>
                  <figure
                    id="ex"
                    className={tw(
                      "mix-blend-multiply bg-center bg-no-repeat bg-black relative",
                    )}
                    style={{
                      zIndex: 3,
                      backgroundImage: `url(${useAsset("/ex.svg")})`,
                      backgroundSize: "70vmin",
                    }}
                  >
                    <div
                      className={tw(
                        "bg-center bg-fixed bg-black w-full h-full mix-blend-overlay relative",
                      )}
                      style={{
                        zIndex: 3,
                        backgroundImage:
                          "linear-gradient(45deg,#333 40%,#ddd 60%,#333)",
                      }}
                    >
                    </div>
                  </figure>
                </div>
              </section>
              <section id="content" className={tw("m-auto px-6")}>
                <Content />
              </section>
              <div id="logos">
                <ACMI /> <DarkMofo />
                <Jag />
                <Mona />
                <MonaFoma />
                <Rising />
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
                  &mdash; <em>Iva Davies</em>, Icehouse
                </strong>
              </p>
            </footer>
          </body>
        </html>
      </MDXProvider>
    </TwindProvider>
  );
}
