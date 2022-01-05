---
title: Templating with EJS
---

# Templating with EJS

**EJS** is perhaps not the prettiest templating language to look at, but it is flexible and fast.

If you know any javascript at all, you're in good shape, and if you don't, it's a nice way to learn the basics of javascript.

The first step is to read the [tags section](https://ejs.co/#tags) of the docs provided by EJS.

_You don't need to focus too much on other EJS documentation like options, CLI, caching, custom file loader, or client-side support, as Airfry takes care of those things._

After that, just look at examples and you'll learn quickly.

#### Variable replacement

Variables can come from [front matter](/docs/input/frontmatte/), [preGenerate data](/docs/input/preGenerate/), the template's [generate script](/docs/output/generateScript/), or [data automatically provided by Airfry](/docs/input/calculated/), or data passed via EJS to sub templates using "include".

```html
The title of this post is <%= title %>
```

#### Testing for the existence of a variable

Use EJS 'locals' to check, otherwise you'll get template error.

```html
<% if (locals.test) { %> <%= locals.test %> <% } %>
```

#### Including a sub template and passing data to it.

Airfry [auto dependency tracking](/docs/performance/dependencyTracking/)
will intelligently track any templates you include for changes, such that if you modify template
that has been included in other templates, those templates will be updated selectively.

You can pass data to sub templates easily using EJS functionality. See the example below.

The path to templates you include must be relative to the template directory you specified during [Airfry Setup](/docs/setup/#template), otherwise the dependency tracking will not work.

```html
<%- include('user/details', {details: user}); %>
```

#### Using javascript to iterate through data

```javascript
<ul>
  <% users.forEach(function(user){ %>
		<%= user.name %>
  <% }); %>
</ul>
```

#### Wrappers

See [template wrappers](/docs/input/wrappers/) for details.
