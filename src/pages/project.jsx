import React, { Suspense, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import useSWR from "swr";
import { useLocation } from "wouter";

const Project = ({ params }) => {
  const { slug } = params;
  return (
    <Suspense fallback={null}>
      <Index slug={slug} />
    </Suspense>
  );
};

const Index = ({ slug }) => {
  const [location] = useLocation();
  const { data, error } = useSWR(location, fetcher, {
    suspense: true,
  });

  let { title = "", mainImage, subtitle, block = [] } =
    data?.data?.allProject?.[0] || {};

  if (!title) return <img className="lost" src="/images/ex.jpg" />;
  return (
    <main>
      <Helmet>
        <title>{title}: Exhibitionist Digital</title>
        <meta
          property="og:image"
          content={mainImage?.asset?.url}
        />
      </Helmet>
      <div className="content">
        <div className="first">
          <Block block={block[0]} />
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </div>
        {block.map((b, i) => {
          if (i == 0) return;
          return <Block block={b} />;
        })}
      </div>
    </main>
  );
};

const Block = ({ block }) => {
  if (block.__typename == "Video") {
    return <video autoPlay playsInline muted loop src={block?.asset?.url} />;
  }
  if (block.__typename == "Image") {
    return (
      <img
        src={`${block?.asset?.url}?auto=format`}
        height={block?.asset?.metadata?.dimensions?.height}
        width={block?.asset?.metadata?.dimensions?.width}
      />
    );
  }
  if (block.__typename == "Tweet") {
    return (
      <div className="tweet">
        <div className="top">
          <img
            src={`${block?.profile?.asset?.url}?auto=format`}
            height={block?.profile?.asset?.metadata?.dimensions?.height}
            width={block?.profile?.asset?.metadata?.dimensions?.width}
          />
          <div>
            <strong>{block?.name}</strong>
            <br />
            @{block?.username}
          </div>
        </div>
        {block?.content && (
          <div className="tweet-content">
            {block.content}
          </div>
        )}
        {block?.mainImage?.asset && (
          <img
            className="feature"
            src={`${block?.mainImage?.asset?.url}?auto=format`}
            height={block?.mainImage?.asset?.metadata?.dimensions?.height}
            width={block?.mainImage?.asset?.metadata?.dimensions?.width}
          />
        )}
      </div>
    );
  }
};

export default Project;

export const fetcher = async (slug) => {
  const query = `{
    allProject(
      where: { slug: { current: { eq: "${slug.replace("/", "")}" } } }
    ) {
      title
      slug {
        current
      }
      subtitle
      mainImage {
        asset {
          url
          metadata {
            dimensions {
              width
              height
              aspectRatio
            }
          }
        }
      }
      blurb
      block {
        __typename
        ... on Tweet {
          Id
          name
          username
          content
          mainImage {
            asset {
              url
              metadata {
                dimensions {
                  width
                  height
                  aspectRatio
                }
              }
            }
          }
          profile {
            asset {
              url
              metadata {
                dimensions {
                  width
                  height
                  aspectRatio
                }
              }
            }
          }
        }
        ... on Image {
          asset {
            url
            metadata {
              dimensions {
                width
                height
                aspectRatio
              }
            }
          }
        }
        ... on Video {
          asset {
            url
          }
        }
      }
    }
  }`;

  const res = await fetch(
    `https://d3l8za3939keaq.cloudfront.net?query=${encodeURIComponent(query)}`,
  );

  const data = await res.json();
  return data || {};
};
