---
title: Setup
order: 2
---

# Setup

Airfry has very little to configure. You can pass the following options on the command line:

```text
  -i, --input <inputDir>    input directory
  -d, --data <dataDir>      data directory
  -o, --output <outputDir>  output directory
  -o, --public <publicDir>  public directory
  -c, --cache <cacheDir>    cache directory
  -nw, --noWatch            quit after processing all templates
  -wo, --watchOnly          dont process at start, only watch
  -cc, --clearCache         clear cache on start
  -v, --verbose             log verbosely
  -V, --version             output the version of Airfry you've installed
  -h, --help                display help for commands
```

Alternatively, you can specify the above options in a file called **airfry.json**:

The defaults are shown here:

```javascript
{
  "options": {
    input:"./airfry/templates",
    data: "./airfry/data",
    output: "./airfry/templates",
    public: "./airfry/public",
    cache: "./airfry/cache",
    noWatch:  false,
    watchOnly:  false,
    clearCache: false,
    verbose:  false,
  }
}
```

## Input Directory

Templates must be in this directory. Airfry will search here recursively when building and will watch for changes recursively while idle.

## Data Directory

This is where you'd put data files whether JSON, markdown, or any other format you choose to support in your template [generate scripts](/docs/templates/generateScript/). Airfry will monitor this folder when checking for [data dependency changes](/docs/performance/dependencyTracking/).

## Output Directory

This is the only directory Airfry is allowed to write to. This helps prevent accidental generation of files on your file system where you don't expect them when making mistakes in your generate scripts.

## Public Directory

This directory is copied recursively into your output directory, for your convenience. The copying occurs before Airfry runs so it's possible you can overwrite these files in your output directory with your generate scripts.

## Cache Directory

When you use Airfry [caching](/docs/performance/cache/) all data gets stored in this directory. You can delete it at will, or use the "clearCache" option when building for production if desired.

## Quit Airfry After Build

On a production build, you probably don't want to keep Airfry running after the site is built. During development, having Airfry monitor file system changes and react instantly with [it's effecient dependency tracking](/docs/performance/dependencyTracking/) is what makes Airfry so much fun to use.

## Don't build, only watch for changes.

If you had to shut down Airfry and for some reason you don't want to regenerate the entire site, you can start Airfry from where you left off. This might be useful if your site is thousands of pages long and can't take advantage of caching.

## Clear Cache on Start

Simply delete the cache directory at start.

## Verbose Logging

Make logging noisier.
