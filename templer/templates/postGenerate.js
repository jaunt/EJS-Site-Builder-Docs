// don't trigger a table of contents write if it hasn't changed

const toc = cache["toc"].data;
const oldToc = cache["oldToc"]?.data || [];

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

const tocsAreDifferent = (a, b) => {
  const aObj = a.reduce((acc, item) => {
    acc[item.url] = item;
    return acc;
  }, {});
  const bObj = b.reduce((acc, item) => {
    acc[item.url] = item;
    return acc;
  }, {});
  if (Object.keys(aObj).length != Object.keys(bObj).length) {
    return true;
  }

  for (const key in aObj) {
    if (!shallowEqual(aObj[key], bObj[key])) {
      return true;
    }
  }
  return false;
};

if (tocsAreDifferent(toc, oldToc)) {
  console.log(toc, oldToc);
  // save old toc for next time, shallow copied
  // to avoid getting updated by reference
  cache["oldToc"] = {
    data: toc.slice(),
  };
  resolve({
    siteFiles: {
      "toc.json": toc,
    },
    cache: cache,
  });
  return;
}

resolve();
