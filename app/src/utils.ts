type Range = [number, number];

export const isOverlappingRange = ([currentStart, currentEnd]: Range, [selectionStart, selectionEnd]: Range) => {
  return (
    (currentStart <= selectionStart && currentEnd >= selectionStart) ||
    (currentStart <= selectionEnd && currentEnd >= selectionEnd) ||
    (currentStart >= selectionStart && currentEnd <= selectionEnd)
  );
};

export const missingInCompareTo = <T>(array: T[], ref: T[]) => {
  const missing = ref.reduce((r, value) => {
    if (!array.includes(value)) {
      r.push(value);
    }

    return r;
  }, [] as T[]);

  return missing;
};

export const extraInCompareTo = <T>(array: T[], ref: T[]) => {
  const extra = array.reduce((r, value) => {
    if (!ref.includes(value)) {
      r.push(value);
    }

    return r;
  }, [] as T[]);

  return extra;
};
