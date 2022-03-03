---
title: Shortcodes
order: 2.1
---

# Shortcodes

Airfry lets you live, eat, and breath javascript. Hence the way you accomplish "shortcodes" is by writing javascript. To use shortcodes in your EJS templates, use the EJS includes feature. You can include an existing template and pass data to it.

**Note:** It might be worth while keeping all your shortcode templates in a separate folder from your layout templates.

## Youtube Example

Let's say you wanted a shortcode for a youtube video.

**youtube.ejs**

```javascript
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/<%=id%>"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

**post.ejs**

```javascript
Check out my youtube video!
<%- include('shortcodes/youtube', {id: "srn5Cd9yR3Y"}); %>
```

## Markdown Shortcodes

If you're using markdown-it to render markdown files, you can use the markdown-it-container plugin to render airfry templates adhoc in your markdown files.

First use your airfry template name for the container name, and the content as json with the data your template needs to render. Example:

```md
Check out this embedded youtube video:

::: shortcode/youtube
{ id: "srn5Cd9yR3Y" }
:::

Thanks for watching!
```

Next, make sure you have installed markdown-it in your project and then install the markdown-it-container plugin.

Here is an example of a shortcode used by the airfry code which generated this website. Check out the sourcecode which uses the same mthod mentioned above. [docsMD.ejs](https://github.com/jaunt/airfryDocs/blob/main/airfry/templates/generators/docsMD.ejs)

:::airfry shortcode/infoBox
{ "title": "notice", "description": "this is cool" }
:::
