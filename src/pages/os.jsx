import React, { Suspense, useEffect, useState } from "react";
import useSWR from "swr";

const Projects = () => {
  return (
    <Suspense fallback={null}>
      <Index />
    </Suspense>
  );
};

const Index = () => {
  const { data, error } = useSWR("open-source", fetcher, {
    suspense: true,
  });
  const { allOpenSource } = data.data;
  return (
    <main>
      <ol className="open-source">
        {allOpenSource.map((project) => {
          return (
            <Project
              icon={project.mainImage?.asset?.url}
              title={project.title}
              repo={`exhibitionist-digital/${project?.slug?.current}`}
              blurb={project.subtitle}
            />
          );
        })}
      </ol>
    </main>
  );
};

export default Projects;

export const fetcher = async (slug) => {
  const query = `{
    allOpenSource(sort: [{ title: DESC }]) {
      title
      subtitle
      slug {
        current
      }
      mainImage {
        asset {
          url
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

const Project = ({ title, blurb, repo, icon }) => {
  const [stars, setStars] = useState(false);
  useEffect(() => {
    getStars();
  }, []);
  const getStars = async () => {
    let s = await fetch(`https://api.github.com/repos/${repo}`);
    s = await s.json();
    setStars(s?.stargazers_count);
  };
  return (
    <li className="os">
      <a href={"https://github.com/" + repo} target="_blank">
        <img src={`${icon}?auto=format`} height="666" width="666" />
        <div>
          <h2>{title}</h2>
          <h3>★ {stars}</h3>
          <p>{blurb}</p>
        </div>
      </a>
    </li>
  );
};
