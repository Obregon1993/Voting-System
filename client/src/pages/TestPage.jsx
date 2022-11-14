import React from 'react';
import Candidate from '../components/Candidate';
import ErrorMessage from '../components/ErrorMessage';

const TestPage = () => {
  return (
    <div>
      <ErrorMessage />
      <Candidate />
    </div>
  );
};

export default TestPage;
