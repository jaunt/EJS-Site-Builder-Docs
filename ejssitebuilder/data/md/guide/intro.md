---
title: Introduction
order: 1
---

# Introduction

_What's awesome about EJS Site Builder?_

**Effecient dependecy tracking** baked-in from the ground up, giving you super-fast change updates, rebuilding only what was changed, even on massive sites with thousands of pages.

**Powered by your javascript**. There's no configuration file to balloon out of control. EJS Site Builder doesn't offer "yet another plug-in architecture" because we already have NPM for that. If you love javascript, you'll be right at home!

**Minimal** by design. It doesn't pollute itself with half-baked semi-useful blogging features that are never quite enough. It's written in typescript, is under 2000 lines of code, and will always be kept as simple as possible.

**Great DX**. Using vscode, you can set breakpoints and step through code in your generate scripts, use code highlighting and even take advantage of AI code generators like github co-pilot.

**Logical and opinionanted workflow** based on decades of software engineering experience. It helps you make the right decisions early on so you don't end up with something unmanagable down the road.

**Integrates with modern tools** like [vite](/integration/vite/) in order to make awesome progressivly enhanced websites. Yes, you can score triple 100s on lighthouse and produce awesome SEO results, and not be judged for wanting a little javascript on your pages!

## Quick Start

- Create an empty project using its vanilla template ([see vite docs](https://vitejs.dev/guide/)).

```bash
npm init vite@latest ejssitebuilderStarter --template vanilla
cd ejssitebuilderStarter
npm install
```

- Install ejssitebuilder

```bash
npm add @danglingdev/ejssitebuilder
```

- Create an ejssitebuilder directory where all the "ingredients" go, and a src directory where vite will serve your site from:

```bash
mkdir ejssitebuilder
mkdir src
```

- Create vite.config.js

```bash
touch vite.config.js
```

- Point vite root to the new src directory. Add the following to vite.config.js:

**vite.config.js**

```javascript
// vite.config.js
export default {
  // config options
  root: "./src",
};
```

- Create some templates to render the site

```bash
mkdir -p ejssitebuilder/templates
touch ejssitebuilder/templates/index.ejs
touch ejssitebuilder/templates/random.ejs
```

- Add some html, front matter, and template variables to index.ejs

**index.ejs**

```javascript
---
generate: /
title: Crispy and healty
---

Title: <%= title %>
<% for (let i=0; i<10; i++) {
  const page = "page_" + i.toString() %>
  <br />
  <a href="/random/<%= page %>/"><%= page %></a>
<% } %>
```

- Add some html, front matter, and a silly generate script to random.ejs

**random.ejs**

```html
---
generate: /random/*
---

Random: <%= title %>

<br />
<a href="/">home</a>

<script generate>
  ({ generatePages }) => {
    // silly example to create 10 pages
    // passing a random number to each
    const pages = 10;
    let toRender = pages;
    for (let i = 0; i < pages; i++) {
      const num = Math.floor(Math.random() * 100);
      generatePages({
        path: "page_" + i.toString(),
        data: {
          title: num.toString(),
        },
      toRender--;
    }
  };
</script>
```

- Install concurrently to be able to trigger ejssitebuilder and vite concurrently:

```bash
npm install concurrently
```

- Update package.json to be able to trigger ejssitebuilder

**package.json**

```bash
... snip ...
  "scripts": {
    "serve": "concurrently --kill-others \"npx ejssitebuilder\" \"npm run dev\"",
... snip ...
```

- Tell ejssitebuilder where to find the templates and where to output the results

```bash
touch ejssitebuilder.json
```

**ejssitebuilder.json**

```javascript
{
  "options": {
    "input": "./ejssitebuilder/templates",
    "output": "./src"
  }
}
```

- Turn on the ejssitebuilderer!

```bash
npm run serve
```

Vite should run very quickly and your new site should be ready to explore, probably at http://localhost:3000 but check the console output to be sure.

If you make changes to your templates, your site should update quickly. When you are done, exit ejssitebuilder and vite with ctrl-c from the console.

### What happened?

**index.ejs** is pretty simple. You can see how data from frontmatter gets rendered into the template.

Important: EJS Site Builder uses [EJS](https://ejs.co/) for its primary template language because it allows us to use javascript everywhere. You may be wondering if EJS Site Builder supports other template languanges. Yes and no. If you have a bunch of existing content in some other template language, it's very easy to use it in your EJS Site Builder project by importing its NPM package, and accessing it through your generate scripts.

For example, these very docs are written in markdown, so if you look at the source you'll see it uses a markdown library to process the pages before rendering through EJS templates.

Checkout the [FAQ](/guide/faq/) for more information.

**random.ejs** is an obscure example of how EJS Site Builder generate scripts work. Generate scripts can be specified inline with your templates, and are responsible for doing something with data before sending it one or more times through your template. Generate scripts can be synchronous or asynchronous. There are of course many other useful generate script features available as you'll find out in these docs.
