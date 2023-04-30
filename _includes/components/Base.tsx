import type { CustomPage } from "../types.ts";
import Header from "./Header.tsx";
import Menu from "./Menu.tsx";

interface Props {
  page: CustomPage;
  children: Node;
}

export default (props: Props) => {
  const site = props.page.data.metas?.site || "";
  const title = props.page.data.title || "";

  return (
    <html lang={props.page.data.metas?.lang}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>{`${site} | ${title}`}</title>
        <link rel="stylesheet" href="/styles/base.css" />
        <link rel="stylesheet" href="/styles/toc.css" />
        <link rel="stylesheet" href="/styles/search.css" />
        <link rel="stylesheet" href="/styles/menu.css" />
        <link rel="stylesheet" href="/styles/header.css" />
        <link rel="stylesheet" href="/styles/container.css" />
        <link rel="stylesheet" href="/styles/breadcrumb.css" />
        <link rel="stylesheet" href="/styles/article.css" />
      </head>
      <body>
        <section className="container">
          <Header page={props.page} />
          <Menu page={props.page} />
          <section className="content">
            {props.children}
          </section>
        </section>
      </body>
    </html>
  );
};
