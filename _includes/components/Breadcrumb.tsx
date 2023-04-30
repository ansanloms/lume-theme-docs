import type { CustomPage } from "../types.ts";
import type { NavData } from "lume/plugins/nav.ts";

interface Props {
  page: CustomPage;
}

export default (props: Props) => {
  const navigations =
    (props.page.data.url
      ? (props.page.data.nav?.breadcrumb(props.page.data.url) || [])
      : []).slice(1);

  return (
    <ul className="breadcrumb">
      <li>
        <a class="material-symbols-outlined" href="/">
          home
        </a>
      </li>
      {navigations.map((navigation) => (
        <li>
          <a href={navigation.data?.url}>
            {navigation.data?.title || navigation.slug}
          </a>
        </li>
      ))}
    </ul>
  );
};
