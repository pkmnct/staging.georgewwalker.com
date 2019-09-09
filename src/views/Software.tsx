import React, { useState, useEffect } from "react";
import Section from "../components/Section";
import Octokit, { ReposGetResponse } from "@octokit/rest";

const excludedRepos = ["gallery-part-1-pkmnct", "625-hw4", "pkmnct.github.io"];

const Software = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (repos.length) {
      const filtered = repos.filter(
        (repo: ReposGetResponse) => !excludedRepos.includes(repo.name)
      );
      filtered.sort((a: ReposGetResponse, b: ReposGetResponse) =>
        (a.stargazers_count + a.watchers_count) / 2 >
        (b.stargazers_count + b.watchers_count) / 2
          ? -1
          : (a.stargazers_count + a.watchers_count) / 2 <
            (b.stargazers_count + b.watchers_count) / 2
          ? 1
          : 0
      );
      console.log(filtered);
    } else {
      const octokit = new Octokit();
      octokit.repos
        .listForUser({ username: "pkmnct", type: "all", sort: "updated" })
        .then(({ data }) => setRepos(data));
    }
  }, [repos]);

  return (
    <Section className="Software">
      <h1>Software Portfolio goes here</h1>
    </Section>
  );
};

export default Software;
