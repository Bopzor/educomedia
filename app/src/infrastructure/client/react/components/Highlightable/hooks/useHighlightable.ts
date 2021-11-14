import { useCallback, useMemo, useState } from 'react';

import { numberIsInRangeArray } from 'src/domain/shared/utils';
import { Range } from 'src/domain/types';

type ParentNodeWithPosition = ParentNode & { dataset: { position: string } };

const useHighlightable = (
  disabled: boolean,
  text: string,
  selections: Range[],
  onSelectText: (range: Range) => void,
) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const paragraphs = useMemo(() => text.split('\n\n'), [text]);
  const getOffsetIndex = useCallback(
    (index: number) => {
      let offset = 0;

      for (let i = index; i > 0; i--) {
        offset += paragraphs[i - 1].length + '\n\n'.length;
      }

      return offset;
    },
    [paragraphs],
  );

  const handleOnMouseUp = () => {
    if (disabled || !isSelecting) {
      return;
    }

    const selection = window.getSelection();

    if (!selection) {
      return;
    }

    const anchor = parseInt((selection.anchorNode!.parentNode! as ParentNodeWithPosition).dataset.position);
    const focus = parseInt((selection.focusNode!.parentNode! as ParentNodeWithPosition).dataset.position);

    if (anchor - focus === 0) {
      return;
    }

    const start = anchor >= focus ? focus : anchor;
    const end = anchor >= focus ? anchor : focus;

    onSelectText([start, end]);

    selection.collapseToEnd();
  };

  const isHighlighted = (index: number) => {
    return numberIsInRangeArray(index, selections);
  };

  return { paragraphs, getOffsetIndex, setIsSelecting, isHighlighted, handleOnMouseUp };
};

export default useHighlightable;
