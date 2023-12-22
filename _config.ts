import lume from "lume/mod.ts";

import docs from "./mod.ts";
import prism from "markdown-it-prism";

const site = lume(
  {
    location: new URL("https://ansanloms.github.io/lume-theme-docs"),
  },
  {
    markdown: {
      plugins: [
        [prism],
      ],
      keepDefaultPlugins: true,
    },
  },
);

site.use(docs({
  metas: {
    site: "lume-theme-docs",
  },
  header: {
    left: [
      {
        title: "lume-theme-docs",
        url: "/",
      },
    ],
    right: [
      {
        title: "code",
        url: "https://github.com/ansanloms/lume-theme-docs",
      },
    ],
    showSearch: true,
  },
  menu: {
    level: 0,
  },
}));

site.ignore("README.md");
site.remoteFile("docs/index.md", "README.md");

site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    if (
      typeof page.data.url === "string" && page.data.url.slice(0, 5) === "/docs"
    ) {
      page.data.url = page.data.url.slice(5);
    }
  }
});

site.process([".html"], (pages) => {
  for (const page of pages) {
    const { document } = page;
    if (!document) {
      continue;
    }

    const linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute(
      "href",
      "https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-nord.min.css",
    );
    linkElement.setAttribute(
      "integrity",
      "sha512-/1nWQ0aAin0IGM5zDndLyY+6xUSiqA1ILh4Mm0XjSqqj4cXOH36rB/2Ep96sT4FOxvNEnUxyPNwqPlEmuImAFw==",
    );
    linkElement.setAttribute("crossorigin", "anonymous");
    linkElement.setAttribute("referrerpolicy", "no-referrer");

    document.head.append(linkElement);
  }
});

export default site;
