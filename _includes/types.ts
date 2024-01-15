import type { Page, PageData } from "lume/core.ts";
import type { MetaData } from "lume/plugins/metas.ts";
import type { Nav } from "lume/plugins/nav.ts";
import type { Node as Toc } from "./deps/lume_markdown_plugins/toc.ts";

export type { PageHelpers } from "lume/core.ts";

export interface CustomPageData extends PageData {
  /**
   * meta.
   */
  metas?: Partial<MetaData>;

  /**
   * Navigation.
   */
  nav?: Nav;

  /**
   * Toc.
   */
  toc?: Toc[];

  /**
   * Page Title.
   */
  title?: string;

  /**
   * Header.
   */
  header?: {
    /**
     * logo.
     */
    logo?: { imgSrc: string; url?: string };

    /**
     * left menu.
     */
    left?: { title: string; url?: string }[];

    /**
     * right menu.
     */
    right?: { title: string; url?: string }[];

    /**
     * show search.
     */
    showSearch?: boolean;
  };

  /**
   * Menu.
   */
  menu?: {
    /**
     * lebel.
     */
    level?: number;
  };

  /**
   * Author.
   */
  author?: string;

  /**
   * Last updated.
   */
  lastUpdated?: Date;
}

export interface CustomPage extends Page {
  data: CustomPageData;
}
