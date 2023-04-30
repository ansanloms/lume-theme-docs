import type { CustomPage } from "../types.ts";
import type { NavData } from "lume/plugins/nav.ts";
import type { Node as Toc } from "./deps/lume_markdown_plugins/toc.ts";

interface Props {
  page: CustomPage;
}

const tocItem = (toc: Toc) => {
  return (
    <>
      <a href={toc.url}>
        {toc.text}
      </a>
      {toc.children && (
        <ul>
          {toc.children.map((child, index) => (
            <li key={index}>
              {tocItem(child)}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default (props: Props) => {
  const toc: Toc = {
    level: 0,
    text: props.page.data.title || "",
    slug: "",
    url: props.page.data.url || "/",
    children: props.page.data?.toc || [],
  };

  return (
    <nav className="toc">
      {tocItem(toc)}
    </nav>
  );
};
