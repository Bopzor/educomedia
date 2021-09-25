import React from 'react';

import { Range } from 'src/domain/types';

import useHighlightable from './hooks/useHighlightable';

type HighlightableProps = {
  text: string;
  selections: Range[];
  disabled: boolean;
  onSelectText: (range: Range) => void;
  getTitle?: (index: number) => string | undefined;
  highlightedStyle?: React.CSSProperties | ((charIndex: number) => React.CSSProperties);
};

const Highlightable: React.FC<HighlightableProps> = ({
  text,
  selections,
  disabled,
  onSelectText,
  getTitle,
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
          {paragraph.split('').map((char: string, index: number) => {
            const idx = index + getOffsetIndex(paragraphIndex);

            return (
              <CharNode
                key={`${char}-${idx}`}
                charIndex={idx}
                isHighlighted={isHighlighted(idx)}
                style={getStyle(idx)}
                title={getTitle?.(idx)}
              >
                {char}
              </CharNode>
            );
          })}
        </p>
      ))}
    </div>
  );
};

type CharNodeProps = {
  charIndex: number;
  isHighlighted: boolean;
  style: React.CSSProperties;
  title?: string;
};

const CharNode: React.FC<CharNodeProps> = ({ charIndex, isHighlighted, style, title, children }) => (
  <span data-position={charIndex} style={isHighlighted ? style : {}} title={title}>
    {children}
  </span>
);

export default Highlightable;
