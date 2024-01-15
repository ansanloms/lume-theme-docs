import type Site from "lume/core/site.ts";
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

const decoder = new TextDecoder();

export interface Options {
  metas?: CustomPageData["metas"];
  header?: CustomPageData["header"];
  menu?: CustomPageData["menu"];
  showAuthor: boolean;
}

export const defaults: Options = {
  metas: undefined,
  header: undefined,
  menu: undefined,
  showAuthor: false,
};

export default function (userOptions?: Partial<Options>) {
  const options: Options = Object.assign(defaults, userOptions || {});

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

    if (options.showAuthor) {
      site.preprocess([".html"], async (pages) => {
        for (const page of pages) {
          if (page.src.entry?.type === "file") {
            const command = new Deno.Command("git", {
              args: [
                "log",
                "-1",
                '--pretty=format:"%at,%an"',
                page.src.entry.src,
              ],
            });

            try {
              const { success, stdout } = await command.output();

              if (success) {
                const [lastUpdated, author] = decoder.decode(stdout).replaceAll(
                  '"',
                  "",
                )
                  .split(
                    ",",
                    2,
                  )
                  .map((v, i) => {
                    if (i === 0) {
                      return new Date(Number(v.trim()) * 1000);
                    } else {
                      return v.trim();
                    }
                  });

                page.data.author = author;
                page.data.lastUpdated = lastUpdated;
              }
            } catch (error) {
              console.error(error);
            }
          }
        }
      });
    }
  };
}
