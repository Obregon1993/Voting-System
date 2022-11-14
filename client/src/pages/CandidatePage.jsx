import React from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Candidate from '../components/Candidate';
import { useParams } from 'react-router-dom';

const CandidatePage = ({ getCandidates }) => {
  let { id } = useParams();
  getCandidates(id);

  return (
    <div>
      <ErrorMessage />
      <Candidate />
    </div>
  );
};

export default CandidatePage;
