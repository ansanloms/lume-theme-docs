import type { CustomPageData } from "../types.ts";
import Base from "../components/Base.tsx";
import Breadcrumb from "../components/Breadcrumb.tsx";
import Toc from "../components/Toc.tsx";
import LastUpdated from "../components/LastUpdated.tsx";

export default (props: CustomPageData) => {
  return (
    <Base page={props.page}>
      <section className="page">
        <Breadcrumb page={props.page} />
        <Toc page={props.page} />
        <article className="article">
          {props.children}
        </article>
        <footer>
          <LastUpdated page={props.page} />
        </footer>
      </section>
    </Base>
  );
};
