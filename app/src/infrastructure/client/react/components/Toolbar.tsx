import React from 'react';

type ToolbarProps = {
  isUnselectText: boolean;
  onClearSelections: () => void;
  onToggleSelection: () => void;
};

const Toolbar: React.FC<ToolbarProps> = ({ isUnselectText, onClearSelections, onToggleSelection }) => (
  <div>
    <button onClick={onClearSelections}>Supprimer toutes les sélections</button>

    <div>
      <button disabled={!isUnselectText} onClick={onToggleSelection}>
        Sélectionner du texte
      </button>
      <button disabled={isUnselectText} onClick={onToggleSelection}>
        Désélectionner du texte
      </button>
    </div>
  </div>
);

export default Toolbar;
