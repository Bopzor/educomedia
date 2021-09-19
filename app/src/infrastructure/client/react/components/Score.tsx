import React from 'react';

import { useSelector } from 'react-redux';

import selectScore from 'src/domain/redux/selectors/selectScore';

const Score: React.FC = () => {
  const score = useSelector(selectScore);

  return <h3>{score}%</h3>;
};

export default Score;
