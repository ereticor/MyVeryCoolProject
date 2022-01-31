const removeEmptyProps = (obj: Record<string, unknown>) => {
  const newObj = {} as Record<string, unknown>;
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] !== "" && obj[prop] !== undefined && obj[prop] !== null) {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

export default removeEmptyProps;
