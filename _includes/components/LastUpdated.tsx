import type { CustomPage } from "../types.ts";

interface Props {
  page: CustomPage;
}

export default (props: Props) => {
  const lastUpdated = props.page.data.lastUpdated
    ? `Last updated on ${
      props.page.data.lastUpdated.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }`
    : "";

  const author = props.page.data.author ? `by ${props.page.data.author}` : "";

  const message = `${lastUpdated} ${author}`.trim();

  if (message) {
    return <p>{message}</p>;
  }
};
