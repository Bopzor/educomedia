import { useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Correction } from 'src/domain/entities/correction';
import { numberIsInRangeArray } from 'src/domain/shared/utils';
import { Range } from 'src/domain/types';
import selectText from 'src/domain/use-cases/selectText';
import unselectText from 'src/domain/use-cases/unselectText';

const useContentView = (selections: Range[], correction?: Correction) => {
  const [isUnselectText, setIsUnselectText] = useState(false);

  const dispatch = useDispatch();

  const correctionRanges = useMemo(() => {
    if (!correction) {
      return [];
    }

    return correction.corrections.map(({ range }) => range);
  }, [correction]);

  const handleOnSelectText = ([start, end]: Range) => {
    const action = isUnselectText ? unselectText : selectText;

    dispatch(action(start, end));
  };

  const isInCorrection = (charIndex: number) => {
    return numberIsInRangeArray(charIndex, correctionRanges);
  };

  const isInSelections = (charIndex: number) => {
    return numberIsInRangeArray(charIndex, selections);
  };

  const getHighlightedStyled = (charIndex: number) => {
    if (isInCorrection(charIndex) && isInSelections(charIndex)) {
      return {
        fontWeight: 700,
        color: 'green',
      };
    }

    if (isInCorrection(charIndex)) {
      return {
        fontWeight: 700,
      };
    }

    return {
      color: 'red',
    };
  };

  return {
    isUnselectText,
    setIsUnselectText,
    selections,
    correction,
    correctionRanges,
    getHighlightedStyled,
    handleOnSelectText,
  };
};

export default useContentView;
