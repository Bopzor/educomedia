import React from 'react';

import { Range } from 'src/domain/types';

import useHighlightable from './hooks/useHighlightable';

type HighlightableProps = {
  text: string;
  selections: Range[];
  disabled: boolean;
  onSelectText: (range: Range) => void;
  highlightedStyle?: React.CSSProperties | ((charIndex: number) => React.CSSProperties);
};

const Highlightable: React.FC<HighlightableProps> = ({
  text,
  selections,
  disabled,
  onSelectText,
  highlightedStyle = { backgroundColor: 'yellow' },
}) => {
  const { setIsSelecting, isHighlighted, handleOnMouseUp } = useHighlightable(disabled, selections, onSelectText);

  const getStyle = (charIndex: number): React.CSSProperties => {
    if (typeof highlightedStyle === 'function') {
      return highlightedStyle(charIndex);
    }

    return highlightedStyle;
  };

  return (
    <div
      ref={(el) => {
        el?.addEventListener('selectstart', () => setIsSelecting(true));
      }}
      onMouseUp={handleOnMouseUp}
    >
      {text.split('').map((char: string, index: number) => (
        <CharNode
          key={`${char}-${index}`}
          charIndex={index}
          isHighlighted={isHighlighted(index)}
          style={getStyle(index)}
        >
          {char}
        </CharNode>
      ))}
    </div>
  );
};

type CharNodeProps = {
  charIndex: number;
  isHighlighted: boolean;
  style: React.CSSProperties;
};

const CharNode: React.FC<CharNodeProps> = ({ charIndex, isHighlighted, style, children }) => (
  <span data-position={charIndex} style={isHighlighted ? style : {}}>
    {children}
  </span>
);

export default Highlightable;
