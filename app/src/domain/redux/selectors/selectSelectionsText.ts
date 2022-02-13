import { AppState } from '../types';

import selectMisinformation from './selectMisinformation';
import selectSelections from './selectSelections';

export const selectSelectionsText = (state: AppState): string[] => {
  const misinformation = selectMisinformation(state);
  const selections = selectSelections(state);

  const texts: string[] = [];

  for (const [start, end] of selections) {
    const text = misinformation?.content.substring(start, end + 1);

    if (text) {
      texts.push(text);
    }
  }

  return texts;
};
