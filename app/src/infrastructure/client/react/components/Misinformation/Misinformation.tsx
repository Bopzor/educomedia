import React from 'react';

import { Range } from 'src/domain/types';

import Highlightable from '../Highlightable/Highlightable';

type MisinformationProps = {
  title: string;
  text: string;
  selections: Range[];
  canSelect: boolean;
  isUnselectText: boolean;
  onSelectText: (range: Range) => void;
};

const Misinformation: React.FC<MisinformationProps> = ({
  title,
  text,
  selections,
  canSelect,
  isUnselectText,
  onSelectText,
}) => {
  const cursor = canSelect ? (isUnselectText ? 'cursor-unselect' : 'cursor-select') : 'default';

  const highlightedStyled = {
    success: {
      fontWeight: 700,
      color: 'green',
    },
    correction: {
      fontWeight: 700,
    },
    error: {
      color: 'red',
    },
    default: {
      backgroundColor: 'yellow',
    },
  };

  return (
    <div className="shadow-lg p-6 rounded-sm col-span-2 my-10">
      <h1 className="mb-9 font-bold text-2xl">{title}</h1>

      <div className={`text-justify mb-20 mt-10 ${cursor}`}>
        <Highlightable
          text={text}
          selections={selections}
          onSelectText={onSelectText}
          highlightedStyle={highlightedStyled}
          disabled={!canSelect}
        />
      </div>
    </div>
  );
};

export default Misinformation;
