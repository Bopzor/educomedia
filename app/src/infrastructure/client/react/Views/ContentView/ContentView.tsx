import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { clearSelections } from 'src/domain/redux/actions/misinformationActions';
import selectCorrection from 'src/domain/redux/selectors/selectCorrection';
import selectMisinformation from 'src/domain/redux/selectors/selectMisinformation';
import selectSelections from 'src/domain/redux/selectors/selectSelections';
import validateSelections from 'src/domain/use-cases/validateSelections';

import Highlightable from '../../components/Highlightable/Highlightable';
import Score from '../../components/Score';
import Toolbar from '../../components/Toolbar';

import useContentView from './hooks/useContentView';

const ContentView: React.FC = () => {
  const selections = useSelector(selectSelections);

  const misinformation = useSelector(selectMisinformation);
  const correction = useSelector(selectCorrection);
  const dispatch = useDispatch();

  const { isUnselectText, setIsUnselectText, correctionRanges, getHighlightedStyled, handleOnSelectText } =
    useContentView(selections, correction);

  if (!misinformation) {
    return null;
  }

  return (
    <div style={{ margin: 'auto', maxWidth: 800, fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Titre</h1>

      <Toolbar
        isUnselectText={isUnselectText}
        onClearSelections={() => dispatch(clearSelections())}
        onToggleSelection={() => setIsUnselectText((b) => !b)}
        disabled={Boolean(correction)}
      />

      <div style={{ textAlign: 'justify', marginBottom: 64 }}>
        <Highlightable
          text={misinformation.content}
          selections={[...selections, ...correctionRanges]}
          onSelectText={handleOnSelectText}
          highlightedStyle={correction ? (charIndex) => getHighlightedStyled(charIndex) : undefined}
          disabled={Boolean(correction)}
        />
      </div>

      {correction && <Score />}

      <div style={{ textAlign: 'center' }}>
        <button disabled={selections.length <= 0 || Boolean(correction)} onClick={() => dispatch(validateSelections())}>
          Envoyer la réponse
        </button>
      </div>
    </div>
  );
};

export default ContentView;
