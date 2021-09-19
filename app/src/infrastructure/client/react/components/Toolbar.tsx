import React from 'react';

type ToolbarProps = {
  isUnselectText: boolean;
  disabled: boolean;
  onClearSelections: () => void;
  onToggleSelection: () => void;
};

const Toolbar: React.FC<ToolbarProps> = ({ isUnselectText, disabled, onClearSelections, onToggleSelection }) => (
  <div>
    <button disabled={disabled} onClick={onClearSelections}>
      Supprimer toutes les sélections
    </button>

    <div>
      <button disabled={!isUnselectText || disabled} onClick={onToggleSelection}>
        Sélectionner du texte
      </button>
      <button disabled={isUnselectText || disabled} onClick={onToggleSelection}>
        Désélectionner du texte
      </button>
    </div>
  </div>
);

export default Toolbar;
