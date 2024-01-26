export const setProperty = (obj: any, path: string, val: any): void => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const lastObj = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), obj);

  if (lastKey != null) {
    lastObj[lastKey] = val;
  }
};

export const getProperty = (obj: any, path: string): any => {
  return path
    .split(".")
    .reduce((obj, key) => (obj?.[key] ? obj[key] : ""), obj);
};
