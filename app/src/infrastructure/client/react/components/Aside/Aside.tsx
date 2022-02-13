import React from 'react';

import { useSelector } from 'react-redux';

import selectCanValidateSelections from 'src/domain/redux/selectors/selectCanValidateSelections';

import Score from '../Score';
import Toolbar from '../Toolbar';

import CurrentSelections from './CurrentSelections';

type AsideProps = {
  isUnselectText: boolean;
  isToolbarDisabled: boolean;
  onClearSelections: () => void;
  onToggleSelection: () => void;

  isValidateSelectionsDisabled: boolean;
  onValidateSelections: () => void;

  showScore: boolean;
};

const Aside: React.FC<AsideProps> = ({
  isUnselectText,
  onClearSelections,
  onToggleSelection,
  isToolbarDisabled,
  isValidateSelectionsDisabled,
  onValidateSelections,
  showScore,
}) => {
  const canValidateSelections = useSelector(selectCanValidateSelections);

  return (
    <div className="bg-purple-50">
      <Toolbar
        isUnselectText={isUnselectText}
        onClearSelections={onClearSelections}
        onToggleSelection={onToggleSelection}
        disabled={isToolbarDisabled}
      />

      <CurrentSelections />

      {showScore && <Score />}

      {canValidateSelections && (
        <button disabled={isValidateSelectionsDisabled} onClick={onValidateSelections}>
          Envoyer la réponse
        </button>
      )}
    </div>
  );
};

export default Aside;
