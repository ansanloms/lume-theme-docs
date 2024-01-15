import type { CustomPage } from "../types.ts";
import type { NavData } from "lume/plugins/nav.ts";

interface Props {
  page: CustomPage;
}

const removeEndsSlash = (pathname: string) => {
  return pathname.endsWith("/")
    ? pathname.substr(0, pathname.length - 1)
    : pathname;
};

const getCurrentHref = (navigation: NavData): string => {
  if (typeof navigation.data?.url === "string") {
    return removeEndsSlash(navigation.data.url);
  } else if (navigation.parent) {
    return removeEndsSlash(getCurrentHref(navigation.parent)) +
      `/${navigation.slug}`;
  }

  return "/";
};

const menuItem = (navigation: NavData, page: CustomPage, deps: number) => {
  const href = typeof navigation.data?.url === "string"
    ? navigation.data.url
    : undefined;

  const selected = (page.data.url || "/").startsWith(
    getCurrentHref(navigation),
  );

  const children = [
    ...(navigation.children || []).filter((child) =>
      !Number.isNaN(Number(child.data?.sidebar_position))
    ).sort((a, b) => {
      const aSitdebarPosition = Number(a.data?.sidebar_position);
      const bSitdebarPosition = Number(b.data?.sidebar_position);

      return aSitdebarPosition === bSitdebarPosition
        ? 0
        : (aSitdebarPosition > bSitdebarPosition ? 1 : -1);
    }),
    ...(navigation.children || []).filter((child) =>
      Number.isNaN(Number(child.data?.sidebar_position))
    ),
  ];

  return (
    <details open={selected}>
      <summary className={navigation.children ? undefined : "empty"}>
        <a href={href} className={selected ? "selected" : undefined}>
          {navigation.data?.title || navigation.slug}
        </a>
      </summary>
      {children && (
        <ul>
          {children.map((child, index) => (
            <li key={`${deps}-${index}`}>
              {menuItem(child, page, deps + 1)}
            </li>
          ))}
        </ul>
      )}
    </details>
  );
};

export default (props: Props) => {
  const url = typeof props.page.data.menu?.level === "number"
    ? ("/" + (props.page.data.url || "")
      .split("/")
      .filter((v) => v !== "")
      .slice(0, props.page.data.menu?.level).join("/"))
    : "/";

  const navigation = url ? props.page.data.nav?.menu(url) : undefined;

  return (
    <nav className="menu">
      {navigation && menuItem(navigation, props.page, 0)}
    </nav>
  );
};
