import type Site from "lume/core/site.ts";
import plugins from "./plugins.ts";
import type { Options } from "./plugins.ts";

export type { Options } from "./plugins.ts";

export default (options: Partial<Options> = {}) => {
  return (site: Site) => {
    site.use(plugins(options));

    for (
      const file of [
        "_includes/types.ts",
        "_includes/layouts/Page.tsx",
        "_includes/components/Toc.tsx",
        "_includes/components/Menu.tsx",
        "_includes/components/Header.tsx",
        "_includes/components/Breadcrumb.tsx",
        "_includes/components/Base.tsx",
        "styles/toc.scss",
        "styles/search.scss",
        "styles/menu.scss",
        "styles/header.scss",
        "styles/container.scss",
        "styles/breadcrumb.scss",
        "styles/base.scss",
        "styles/article.scss",
      ]
    ) {
      site.remoteFile(file, import.meta.resolve(`./${file}`));
    }
  };
};
