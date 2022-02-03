---
title: Post Generate
order: 10
---

# Writing Out Build Summary Data

If you add a file called **postGenerate.js** to the root of your template folder, Airfry will call it when the build is complete or after it finishes updating when the filesystem is being monitored.

Whenever files a written during generation, Airfry keeps track of the details. This data is made available in your postGenerate.js script.

Your postGenerate.js script will have access to a javascript object called "output". The stucture is as follows:

```typescript
type FilesWritten = {
  source: string;
  path: string;
};

type OutputData = {
  html: FilesWritten[];
  entry: FilesWritten[];
  lib: FilesWritten[];
  json: FilesWritten[];
  outData: GeneratorDataOutput;
};
```

The type "FilesWritten" above is an object where keys are the template names which caused the output, and values are the paths of they outputs they generated.

[Generate scripts](/docs/templates/generateScript/) can also include an "outData" object which lets you collect information during your build for the purposes of summarizing your build. That data is also accessible in the "output" object as a key value pairs, key being the template name, value being the data.

Here's an example of what supplying output data would look like in your generate scripts:

```javascript
resolve({
  // generate / cache etc goes here...
  outData: {
    someData: "This will be passed to your post generate script.",
    otherData: "This will also be passed to your post generate script.",
  },
});
```

This is a simple example of a post generate script which simply writes the entire output structure to disk as a json file. You're free to do whatever you want with the data.

## Example Post Generate Script

```javascript
// postGenerate.js is called after all generation is complete
// so that we can write any site data based on the results of all generations
//
// It must resolve asynchronously
// or reject on failure.
//
// Inputs:
//  output -> key/value of data passed from generate scripts using "outData"
//
// Outputs:
//
// site: list of json serializable objects which will created as json files
//
const path = require("path");

resolve({
  siteFiles: {
    "build_summary.json": output,
  },
});
```
