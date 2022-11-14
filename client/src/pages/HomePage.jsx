import React from 'react';
import Candidates from '../components/Candidates';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = (props) => {
  return (
    <div>
      <ErrorMessage />
      <Candidates {...props} />
    </div>
  );
};

export default HomePage;
