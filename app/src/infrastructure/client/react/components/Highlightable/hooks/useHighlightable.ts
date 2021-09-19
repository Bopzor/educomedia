import { useState } from 'react';

import { numberIsInRangeArray } from 'src/domain/shared/utils';
import { Range } from 'src/domain/types';

type ParentNodeWithPosition = ParentNode & { dataset: { position: string } };

const useHighlightable = (disabled: boolean, selections: Range[], onSelectText: (range: Range) => void) => {
  const [isSelecting, setIsSelecting] = useState(false);

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

  return { setIsSelecting, isHighlighted, handleOnMouseUp };
};

export default useHighlightable;
