import React from 'react';

import { useSelector } from 'react-redux';

import { selectCorrectionText } from 'src/domain/redux/selectors/selectCorrectionText';
import { HighlightedState, selectHighlightedState } from 'src/domain/redux/selectors/selectHighlightedState';
import { AppState } from 'src/domain/redux/types';
import { Range } from 'src/domain/types';

import useHighlightable from './hooks/useHighlightable';

type HighlightableProps = {
  text: string;
  selections: Range[];
  disabled: boolean;
  onSelectText: (range: Range) => void;
  highlightedStyle: { [key in HighlightedState]: React.CSSProperties };
};

const Highlightable: React.FC<HighlightableProps> = ({
  text,
  selections,
  disabled,
  onSelectText,
  highlightedStyle,
}) => {
  const { paragraphs, getOffsetIndex, setIsSelecting, handleOnMouseUp } = useHighlightable(
    disabled,
    text,
    selections,
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
              <CharNode key={`${char}-${idx}`} charIndex={idx} highlightedStyle={highlightedStyle}>
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
  highlightedStyle: { [key in HighlightedState]: React.CSSProperties };
};

const CharNode: React.FC<CharNodeProps> = ({ charIndex, highlightedStyle, children }) => {
  const title = useSelector((state: AppState) => selectCorrectionText(state, charIndex));
  const highlightedState = useSelector((state: AppState) => selectHighlightedState(state, charIndex));

  return (
    <span data-position={charIndex} style={highlightedState ? highlightedStyle[highlightedState] : {}} title={title}>
      {children}
    </span>
  );
};

export default Highlightable;
