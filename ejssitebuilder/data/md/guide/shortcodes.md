---
title: Shortcodes
order: 2.1
---

# Shortcodes

EJS Site Builder lets you live, eat, and breath javascript. Hence the way you accomplish "shortcodes" is by writing javascript. To use shortcodes in your EJS templates, use the EJS includes feature. You can include an existing template and pass data to it.

**Note:** It might be worth while keeping all your shortcode templates in a separate folder from your layout templates.

## Youtube Example

Let's say you wanted a shortcode for a youtube video. First you save this somewhere in your ejssitebuilder/templates folder:

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

Then in an ejs file where you want to embed a youtube video, you would simply include it like so:

**post.ejs**

```javascript
Check out my youtube video!
<%- include('shortcodes/youtube', {id: "srn5Cd9yR3Y"}); %>
```

## Markdown Shortcodes

If you're using markdown-it to render markdown files which is highly recommended, you can use the [markdown-it-fence](https://github.com/geekplux/markdown-it-fence) plugin to help render ejssitebuilder templates adhoc in your markdown files.

The idea is use your ejssitebuilder template name for the fence name, and the content as JSON with the data your template needs to render. Example:

**Markdown:**

```md
Check out this embedded youtube video:

::ejssitebuilder shortcode/youtube
{ id: "srn5Cd9yR3Y" }
:::

Thanks for watching!
```

Next, make sure you have installed markdown-it and markdown-it-fence in your project. Then you can write a function which takes the JSON string supplied in your md fence, and feeds it to the ejssitebuilder function **renderTemplate** which EJS Site Builder makes available to your template. See details about [renderTemplate here](/templates/generateScript/)

Next we'll demonstrate an example of a shortcode used by the ejssitebuilder code which generated these docs. Check out the sourcecode which uses the same mthod mentioned above. [docsMD.ejs](https://github.com/jaunt/ejssitebuilderDocs/blob/main/ejssitebuilder/templates/generators/docsMD.ejs)

The important bit of the generate script you would use to render md files which uses the markdown-it-fence pluging looks like this

```js
function yourPlugin(md, options) {
  return markdownitfence(md, "ejssitebuilder", {
    marker: ":",
    render: (tokens, idx, options, env, self) => {
      const template = tokens[idx].info.trim().split(" ")[1];
      const data = JSON.parse(tokens[idx].content.trim());
      return renderTemplate(template, data);
    },
  });
}
md.use(yourPlugin);
```

The md source code for the this page (the one you are reading now) can be seen here [shortcodes.md](https://github.com/jaunt/ejssitebuilderDocs/blob/main/ejssitebuilder/data/md/guide/shortcodes.md) Take a look at it. You will see after this text that it specifies a shortcode just like this:

```md
:::ejssitebuilder shortcode/infoBox
{ "title": "notice", "description": "this is cool" }
:::
```

The above shortcode tells ejssitebuilder to render the data you pass between the fences into the template you specify. Use JSON to specify your template variables. The result, based on the useless short code from these docs is as follows:

:::ejssitebuilder shortcode/infoBox
{ "title": "notice", "description": "this is cool" }
:::

You can take a look at the very useless and for demonstration purposes shortcode/infobox here: [infoBox.ejs](https://github.com/jaunt/ejssitebuilderDocs/blob/main/ejssitebuilder/templates/shortcode/infoBox.ejs)

It simply renders title and description like so:

```html
<div
  class="bg-green-200 border-2 border-green-600 rounded-md text-green-800 pl-4 py-2"
>
  <%= title %> - <%= description %>
</div>
```

Here's a live example of rendering the youtube video shortcode from MD. If you look at the bottom of [shortcodes.md](https://github.com/jaunt/ejssitebuilderDocs/blob/main/ejssitebuilder/data/md/guide/shortcodes.md), which describes the page you are reading now, you will see this

```md
:::ejssitebuilder shortcode/youtube
{ "id": "srn5Cd9yR3Y" }
:::
```

...which renders this:

:::ejssitebuilder shortcode/youtube
{ "id": "srn5Cd9yR3Y" }
:::
