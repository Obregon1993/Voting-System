import React from 'react';
import { Navigate } from 'react-router-dom';
import CreateCandidates from '../components/CreateCandidates';
import ErrorMessage from '../components/ErrorMessage';

const CreateCandidatesPage = ({ isAuthenticated }) => {
  console.log();
  if (!isAuthenticated) return <Navigate replace to="/login" />;
  return (
    <div>
      <ErrorMessage />
      <CreateCandidates />
    </div>
  );
};

export default CreateCandidatesPage;
