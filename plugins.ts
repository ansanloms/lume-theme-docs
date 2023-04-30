import type { Site } from "lume/core.ts";
import type { CustomPageData } from "./_includes/types.ts";

import basePath from "lume/plugins/base_path.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import sass from "lume/plugins/sass.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import nav from "lume/plugins/nav.ts";
import pagefind from "lume/plugins/pagefind.ts";
import metas from "lume/plugins/metas.ts";
import title from "./deps/lume_markdown_plugins/title.ts";
import toc from "./deps/lume_markdown_plugins/toc.ts";

export interface Options {
  metas?: CustomPageData["metas"];
  header?: CustomPageData["header"];
  menu?: CustomPageData["menu"];
}

export default (options: Options = {}) => {
  return (site: Site) => {
    site.data("layout", "/layouts/Page.tsx");

    if (options.metas) {
      site.data("metas", options.metas);
    }

    if (options.header) {
      site.data("header", options.header);
    }

    if (options.menu) {
      site.data("menu", options.menu);
    }

    site.use(basePath());
    site.use(resolveUrls());
    site.use(sass());
    site.use(jsx());
    site.use(nav());
    site.use(pagefind());
    site.use(metas());
    site.use(title());
    site.use(toc());
  };
};
