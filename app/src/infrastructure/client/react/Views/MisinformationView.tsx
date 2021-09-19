import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { clearSelections } from 'src/domain/redux/actions/misinformationActions';
import selectMisinformation from 'src/domain/redux/selectors/selectMisinformation';
import selectSelections from 'src/domain/redux/selectors/selectSelections';
import { Range } from 'src/domain/types';
import selectText from 'src/domain/use-cases/selectText';
import unselectText from 'src/domain/use-cases/unselectText';
import validateSelections from 'src/domain/use-cases/validateSelections';

import Highlightable from '../components/Highlightable/Highlightable';
import Toolbar from '../components/Toolbar';

const MisinformationView: React.FC = () => {
  const [isUnselectText, setIsUnselectText] = useState(false);
  const selections = useSelector(selectSelections);

  const misinformation = useSelector(selectMisinformation);
  const dispatch = useDispatch();

  const handleOnSelectText = ([start, end]: Range) => {
    const action = isUnselectText ? unselectText : selectText;

    dispatch(action(start, end));
  };

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
      />

      <div style={{ textAlign: 'justify', marginBottom: 64 }}>
        <Highlightable text={misinformation.content} selections={selections} onSelectText={handleOnSelectText} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <button disabled={selections.length <= 0} onClick={() => dispatch(validateSelections())}>
          Envoyer la réponse
        </button>
      </div>
    </div>
  );
};

export default MisinformationView;
