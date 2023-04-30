import type { CustomPage } from "../types.ts";

interface Props {
  page: CustomPage;
}

export default (props: Props) => {
  const logo = props.page.data.header?.logo;
  const menuLeft = props.page.data.header?.left || [];
  const menuRight = props.page.data.header?.right || [];
  const showSearch = props.page.data.header?.showSearch === true;

  return (
    <header className="header">
      {logo && (
        <a href={logo.url} className="logo">
          <img src={logo.imgSrc} />
        </a>
      )}
      <ul className="list left">
        {menuLeft.map((menu, index) => (
          <li key={index}>
            {typeof menu.url === "undefined"
              ? <p>{menu.title}</p>
              : (
                <a href={menu.url}>
                  {menu.title}
                </a>
              )}
          </li>
        ))}
      </ul>
      <ul className="list right">
        {menuRight.map((menu, index) => (
          <li key={index}>
            {typeof menu.url === "undefined"
              ? <p>{menu.title}</p>
              : (
                <a href={menu.url}>
                  {menu.title}
                </a>
              )}
          </li>
        ))}
      </ul>
      {showSearch && <div id="search" />}
    </header>
  );
};
