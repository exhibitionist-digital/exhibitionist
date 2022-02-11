import React, { Suspense } from "react";
import { Link } from "wouter";
import useSWR from "swr";

const Projects = () => {
  return (
    <Suspense fallback={null}>
      <Index />
    </Suspense>
  );
};

const Index = () => {
  const { data, error } = useSWR("projects", fetcher, {
    suspense: true,
  });
  const { allProject } = data.data;

  return (
    <main>
      <ol className="projects">
        {allProject.map((project) => {
          return (
            <Project
              title={project.title}
              subtitle={project.subtitle}
              blurb={project.blurb}
              image={project.mainImage.asset}
              slug={project.slug.current}
            />
          );
        })}
      </ol>
    </main>
  );
};

export default Projects;

const Project = ({ title, subtitle, blurb, image, video, slug, external }) => {
  return (
    <li className="project">
      <section>
        {image && (
          <figure>
            <img
              src={`${image.url}?auto=format`}
              alt={title}
              height={image?.metadata?.dimensions?.height}
              width={image?.metadata?.dimensions?.width}
            />
            <img
              src={`${image.url}?auto=format`}
              alt={title}
              height={image?.metadata?.dimensions?.height}
              width={image?.metadata?.dimensions?.width}
            />
            <div></div>
          </figure>
        )}

        <InternalOrExternal
          external={external}
          slug={slug}
          title={title}
          subtitle={subtitle}
          blurb={blurb}
        />
      </section>
    </li>
  );
};

const InternalOrExternal = ({ external, slug, title, subtitle, blurb }) => {
  if (external) {
    return (
      <a
        href={external || `/${slug}`}
        target={"blank"}
      >
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>{blurb}</p>
      </a>
    );
  } else {
    return (
      <Link href={`/${slug}`}>
        <a>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <p>{blurb}</p>
        </a>
      </Link>
    );
  }
};

export const fetcher = async (slug) => {
  const query = `{
    allProject(sort: [{ title: ASC }]) {
      title
      subtitle
      blurb
      slug {
        current
      }
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
    }
  }`;

  const res = await fetch(
    `https://d3l8za3939keaq.cloudfront.net/?query=${encodeURIComponent(query)}`,
  );

  const data = await res.json();
  return data || {};
};
