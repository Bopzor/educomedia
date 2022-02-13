import React from 'react';

import { useSelector } from 'react-redux';

import { selectSelectionsText } from 'src/domain/redux/selectors/selectSelectionsText';

const CurrentSelections: React.FC = () => {
  const selectionsText = useSelector(selectSelectionsText);

  return (
    <div>
      {selectionsText.map((selection, index) => (
        <p key={index}>{selection}</p>
      ))}
    </div>
  );
};

export default CurrentSelections;
