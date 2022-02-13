import React from 'react';

import UnselectTextIcon from '../icons/eraser.svg';
import SelectTextIcon from '../icons/highlight-marker.svg';
import ClearSelectionIcon from '../icons/trash-bin.svg';

import ToggleButtons from './ToggleButtons';

type ToolbarProps = {
  isUnselectText: boolean;
  disabled: boolean;
  onClearSelections: () => void;
  onToggleSelection: () => void;
};

const Toolbar: React.FC<ToolbarProps> = ({ isUnselectText, disabled, onClearSelections, onToggleSelection }) => {
  return (
    <div className="flex justify-between py-2 px-3">
      <ToggleButtons
        label1={
          <span title="Sélectionner du texte">
            <SelectTextIcon width={32} height={32} />
          </span>
        }
        label2={
          <span title="Désélectionner du texte">
            <UnselectTextIcon width={32} height={32} />
          </span>
        }
        activeValue={isUnselectText ? 2 : 1}
        onToggle={onToggleSelection}
        disabled={disabled}
      />

      <button
        className="bg-red-300 px-3 py-2 rounded-lg"
        disabled={disabled}
        onClick={onClearSelections}
        title="Supprimer toutes les sélections"
      >
        <ClearSelectionIcon width={32} height={32} />
      </button>
    </div>
  );
};

export default Toolbar;
