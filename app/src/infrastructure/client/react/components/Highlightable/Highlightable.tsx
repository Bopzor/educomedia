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
  const { paragraphs, getOffsetIndex, getStyle, setIsSelecting, isHighlighted, handleOnMouseUp } = useHighlightable(
    disabled,
    text,
    selections,
    highlightedStyle,
    onSelectText,
  );

  return (
    <div
      ref={(el) => {
        el?.addEventListener('selectstart', () => setIsSelecting(true));
      }}
      onMouseUp={handleOnMouseUp}
    >
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={`paragraph-${paragraphIndex}`} style={{ marginBottom: 8 }}>
          {paragraph.split('').map((char: string, index: number) => (
            <CharNode
              key={`${char}-${index + getOffsetIndex(paragraphIndex)}`}
              charIndex={index + getOffsetIndex(paragraphIndex)}
              isHighlighted={isHighlighted(index + getOffsetIndex(paragraphIndex))}
              style={getStyle(index + getOffsetIndex(paragraphIndex))}
            >
              {char}
            </CharNode>
          ))}
        </p>
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
