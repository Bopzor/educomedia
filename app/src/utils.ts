type Range = [number, number];

export const isOverlappingRange = ([currentStart, currentEnd]: Range, [selectionStart, selectionEnd]: Range) => {
  return (
    (currentStart <= selectionStart && currentEnd >= selectionStart) ||
    (currentStart <= selectionEnd && currentEnd >= selectionEnd) ||
    (currentStart >= selectionStart && currentEnd <= selectionEnd)
  );
};
