import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { accessMisinformation } from 'src/domain/use-cases/accessMisinformation';

import ContentView from './Views/ContentView/ContentView';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accessMisinformation('misinfo-1'));
  });

  return (
    <>
      <ContentView />
    </>
  );
};

export default App;
