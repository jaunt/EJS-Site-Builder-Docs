---
title: Templating with EJS
order: 3
---

# Templating with EJS

**EJS** is perhaps not the prettiest templating language to look at, but it is flexible and fast.

If you know any javascript at all, you're in good shape, and if you don't, it's a nice way to learn the basics of javascript.

The first step is to read the [tags section](https://ejs.co/#tags) of the docs provided by EJS.

_**Important**: You probably shouldn't worry about or use EJS features including its options, CLI, caching, custom file loader, or client-side support, as Templer takes care of those things._

After that, just look at examples and you'll learn quickly.

#### Variable replacement

Variables can come from [front matter](/templates/frontmatte/), [preGenerate data](/templates/preGenerate/), the template's [generate script](/templates/generateScript/), or [data automatically provided by Templer](/templates/calculated/), or data passed via EJS to sub templates using "include".

```html
The title of this post is <%= title %>
```

#### Testing for the existence of a variable

Use EJS 'locals' to check, otherwise you'll get template error.

```html
<% if (locals.test) { %> <%= locals.test %> <% } %>
```

#### Including a sub template and passing data to it.

Templer [auto dependency tracking](/performance/dependencyTracking/)
will intelligently track any templates you include for changes, such that if you modify template
that has been included in other templates, those templates will be updated selectively.

You can pass data to sub templates easily using EJS functionality. See the example below.

The path to templates you include must be relative to the template directory you specified during [Templer Setup](/guide/setup/#directories), otherwise the dependency tracking will not work.

```html
<%- include('user/details', {details: user}); %>
```

In the example above, Templer will look for a tepmlate called **details.ejs** in a folder it expects to be called _user_ under your templates directory.

#### Using javascript to iterate through data

```javascript
<ul>
  <% users.forEach(function(user){ %>
		<%= user.name %>
  <% }); %>
</ul>
```

#### Wrappers

See [template wrappers](/templates/wrappers/) for details.

#### Generating multiple files from a single template.

See [generate scripts](/templates/generateScript/) for details.
