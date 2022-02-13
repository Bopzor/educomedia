import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { clearSelections } from 'src/domain/redux/actions/misinformationActions';
import selectCorrection from 'src/domain/redux/selectors/selectCorrection';
import selectInformationTitle from 'src/domain/redux/selectors/selectInformationTitle';
import selectMisinformation from 'src/domain/redux/selectors/selectMisinformation';
import selectSelections from 'src/domain/redux/selectors/selectSelections';
import { validateSelections } from 'src/domain/use-cases/validateSelections';

import Aside from '../../components/Aside/Aside';
import Misinformation from '../../components/Misinformation/Misinformation';

import useContentView from './hooks/useContentView';

const ContentView: React.FC = () => {
  const informationTitle = useSelector(selectInformationTitle);
  const selections = useSelector(selectSelections);

  const misinformation = useSelector(selectMisinformation);
  const correction = useSelector(selectCorrection);
  const dispatch = useDispatch();

  const { isUnselectText, setIsUnselectText, correctionRanges, handleOnSelectText } = useContentView(
    selections,
    correction,
  );

  if (!misinformation) {
    return null;
  }

  return (
    <div className="font-sans grid grid-cols-4 gap-10 pr-10 h-full">
      <Aside
        isToolbarDisabled={Boolean(correction)}
        isUnselectText={isUnselectText}
        onClearSelections={() => dispatch(clearSelections())}
        onToggleSelection={() => setIsUnselectText((b) => !b)}
        isValidateSelectionsDisabled={selections.length <= 0 || Boolean(correction)}
        onValidateSelections={() => dispatch(validateSelections())}
        showScore={Boolean(correction)}
      />

      <Misinformation
        title={informationTitle ?? ''}
        text={misinformation.content}
        selections={[...selections, ...correctionRanges]}
        onSelectText={handleOnSelectText}
        canSelect={Boolean(!correction)}
        isUnselectText={isUnselectText}
      />
    </div>
  );
};

export default ContentView;
