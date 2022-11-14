import React from 'react';
import { connect } from 'react-redux';
import { getCurrentCandidates } from '../store/actions';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import TestPage from '../pages/TestPage';
import HomePage from '../pages/HomePage';
import CandidatePage from '../pages/CandidatePage';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        history={navigate}
        params={params}
        location={location}
      />
    );
  }

  return ComponentWithRouterProp;
}

const RouteViews = ({ auth, getCurrentCandidates, ...props }) => {
  return (
    <main>
      <Routes>
        <Route exact path="/" element={<HomePage {...props} />} />
        <Route
          exact
          path="/login"
          element={
            <AuthPage authType="login" isAuthenticated={auth.isAuthenticated} />
          }
        />
        <Route
          exact
          path="/register"
          element={
            <AuthPage
              authType="register"
              isAuthenticated={auth.isAuthenticated}
            />
          }
        />
        <Route
          exact
          path="/candidates/:id"
          element={
            <CandidatePage getCandidates={getCurrentCandidates} {...props} />
          }
        />
        <Route exact path="/test" element={<TestPage />} />
      </Routes>
    </main>
  );
};

export default withRouter(
  connect((store) => ({ auth: store.auth }), { getCurrentCandidates })(
    RouteViews
  )
);
