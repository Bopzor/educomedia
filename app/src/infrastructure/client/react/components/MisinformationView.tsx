import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import selectMisinformation from '../../../../domain/redux/selectors/selectMisinformation';
import selectSelections from '../../../../domain/redux/selectors/selectSelections';
import { Range } from '../../../../domain/types';
import selectText from '../../../../domain/use-cases/selectText';

import Highlightable from './Highlightable/Highlightable';

const MisinformationView: React.FC = () => {
  const selections = useSelector(selectSelections);

  const misinformation = useSelector(selectMisinformation);
  const dispatch = useDispatch();

  if (!misinformation) {
    return null;
  }

  return (
    <Highlightable
      text={misinformation.content}
      selections={selections}
      onSelectText={([start, end]: Range) => dispatch(selectText(start, end))}
    />
  );
};

export default MisinformationView;
