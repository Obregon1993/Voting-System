import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import TestPage from '../pages/TestPage';

const RouteViews = ({ auth }) => {
  return (
    <main>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthPage authType="login" isAuthenticated={auth.isAuthenticated} />
          }
        />
        <Route
          path="/register"
          element={
            <AuthPage
              authType="register"
              isAuthenticated={auth.isAuthenticated}
            />
          }
        />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </main>
  );
};

export default connect((store) => ({ auth: store.auth }))(RouteViews);
