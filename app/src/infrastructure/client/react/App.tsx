import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import accessMisinformation from '../../../domain/use-cases/accessMisinformation';

import MisinformationView from './components/MisinformationView';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accessMisinformation('misinfo-1'));
  });

  return (
    <>
      <MisinformationView />
    </>
  );
};

export default App;
