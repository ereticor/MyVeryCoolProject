export const truncObjectByKeys = ({
  obj,
  keys,
  includeId = false,
}: {
  obj: Record<string, unknown>;
  keys: string[];
  includeId?: boolean;
}): { [key: keyof typeof obj]: typeof obj[typeof key] } => {
  return Object.assign(
    {},
    ...Object.entries(obj).map(([objKey, value]) => {
      if (includeId && objKey === "id") {
        return { id: value };
      }
      if (keys.some((key) => key === objKey)) {
        return { [objKey]: value };
      }
    })
  );
};
