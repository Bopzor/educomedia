import React from 'react';

type ToggleButtonsProps = {
  label1: React.ReactNode;
  label2: React.ReactNode;
  disabled: boolean;
  activeValue: number;
  onToggle: (value: number) => void;
};

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ label1, label2, disabled, activeValue, onToggle }) => {
  const isActiveLabel = (value: number) => activeValue === value;

  return (
    <div className="flex justify-center max-w-max rounded-lg bg-yellow-100">
      <button
        className={`flex-1 flex justify-center items-center px-3 py-2 max-w-max rounded-lg rounded-r-none ${
          isActiveLabel(1) && !disabled ? 'bg-yellow-300' : ''
        } ${disabled ? 'opacity-70 cursor-default' : ''}`}
        disabled={disabled || isActiveLabel(1)}
        onClick={() => onToggle(1)}
      >
        {label1}
      </button>

      <button
        className={`flex-1 flex justify-center items-center px-3 py-2 max-w-max rounded-lg rounded-l-none ${
          isActiveLabel(2) && !disabled ? 'bg-yellow-300' : ''
        } ${disabled ? 'opacity-70 cursor-default' : ''}`}
        disabled={disabled || isActiveLabel(2)}
        onClick={() => onToggle(2)}
      >
        {label2}
      </button>
    </div>
  );
};

export default ToggleButtons;
