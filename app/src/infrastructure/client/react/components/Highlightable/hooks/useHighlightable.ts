import { useState } from 'react';

import { Range } from '../../../../../../domain/types';

type ParentNodeWithPosition = ParentNode & { dataset: { position: string } };

const useHighlightable = (selections: Range[], onSelectText: (range: Range) => void) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const handleOnMouseUp = () => {
    if (!isSelecting) {
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
    for (const [start, end] of selections) {
      if (start <= index && end >= index) {
        return true;
      }
    }

    return false;
  };

  return { setIsSelecting, isHighlighted, handleOnMouseUp };
};

export default useHighlightable;
