import { useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Correction } from 'src/domain/entities/correction';
import { Range } from 'src/domain/types';
import { selectText } from 'src/domain/use-cases/selectText';
import { unselectText } from 'src/domain/use-cases/unselectText';

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

  return {
    isUnselectText,
    setIsUnselectText,
    selections,
    correction,
    correctionRanges,

    handleOnSelectText,
  };
};

export default useContentView;
