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

If you're using markdown-it to render markdown files, you could use a markdown-it plugin like [markdown-it-container](https://github.com/markdown-it/markdown-it-container).

You'd need to install the plugin in your project, and require it in your generate script.
