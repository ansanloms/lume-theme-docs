# lume-theme-docs

A theme for documentation using [Lume](https://lume.land/).

## Install

Set up [Lume](https://lume.land/docs/overview/installation/) and add the following to your _config.ts:

```typescript
import lume from "lume/mod.ts";
import docs from "https://raw.githubusercontent.com/lumeland/theme-simple-blog/main/mod.ts";

const site = lume();

site.use(docs());

export default site;
```

This theme uses [JSX Preact](https://lume.land/plugins/jsx_preact/) for its layout, so add the following to the compilerOptions in your deno.json:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "npm:preact"
  }
}
```
