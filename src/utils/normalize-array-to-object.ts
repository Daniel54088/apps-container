type HasId = {
  id: string;
};
export const normalizeObjArray = <T extends HasId>(
  arr: T[],
  key: keyof T = "id"
): Record<string, T> => {
  return arr.reduce((obj, item) => {
    const keyValue = item[key];
    if (typeof keyValue === "string" || typeof keyValue === "number") {
      return { ...obj, [keyValue]: item };
    }
    return obj;
  }, {} as Record<string | number, T>);
};
