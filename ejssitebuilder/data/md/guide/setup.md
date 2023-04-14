---
title: Setup
order: 2
---

# Setup

EJS Site Builder has very little to configure. You can pass the following options on the command line:

```text
  -i, --input <inputDir>    input directory
  -d, --data <dataDir>      data directory
  -o, --output <outputDir>  output directory
  -o, --public <publicDir>  public directory
  -c, --cache <cacheDir>    cache directory
  -nw, --noWatch            quit after processing all templates
  -cc, --clearCache         clear cache on start
  -v, --verbose             log verbosely
  -V, --version             output the version of EJS Site Builder you've installed
  -h, --help                display help for commands
```

Alternatively, you can specify the above options in a file called **ejssitebuilder.json**:

The defaults are shown here:

```javascript
{
  "options": {
    input:"./ejssitebuilder/templates",
    data: "./ejssitebuilder/data",
    output: "./ejssitebuilder/templates",
    public: "./ejssitebuilder/public",
    cache: "./ejssitebuilder/cache",
    noWatch:  false,
    clearCache: false,
    verbose:  false,
  }
}
```

## Input Directory

Templates must be in this directory. EJS Site Builder will search here recursively when building and will watch for changes recursively while idle.

## Data Directory

This is where you'd put data files whether JSON, markdown, or any other format you choose to support in your template [generate scripts](/templates/generateScript/). EJS Site Builder will monitor this folder when checking for [data dependency changes](/performance/dependencyTracking/).

## Output Directory

This is the only directory EJS Site Builder is allowed to write to. This helps prevent accidental generation of files on your file system where you don't expect them when making mistakes in your generate scripts.

## Public Directory

This directory is copied recursively into your output directory, for your convenience. The copying occurs before EJS Site Builder runs so it's possible you can overwrite these files in your output directory with your generate scripts.

## Cache Directory

When you use EJS Site Builder [caching](/performance/cache/) all data gets stored in this directory. You can delete it at will, or use the "clearCache" option when building for production if desired.

## Quit EJS Site Builder After Build

On a production build, you probably don't want to keep EJS Site Builder running after the site is built. During development, having EJS Site Builder monitor file system changes and react instantly with [it's effecient dependency tracking](/performance/dependencyTracking/) is what makes EJS Site Builder so much fun to use.

## Clear Cache on Start

Simply delete the cache directory at start.

## Verbose Logging

Make logging noisier.
