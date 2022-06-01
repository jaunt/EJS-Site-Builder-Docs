---
title: Template Wrappers
order: 11
---

# Template Wrappers

Any template can wrap another template, as long as it includes a reserved template called **"\_body"**.

Generally, a wrapper template would not have its own front matter data,
as it would not be used to directly generate a page, and any data passed in would likely
come from the templates wrapping it.

Here's an example of a template wrapper:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= title %></title>
  </head>

  <body class="myClass">
    <%- include('_body') %>
    <script type="module" src="<%- pagePath %>/<%- lastPath %>.js"></script>
  </body>
</html>
```

The include for **"\_body"** will be replaced the content generated from whichever template wrapped itself.

**Note:** Wrapper scripts can recursively wrap other wrappers.
