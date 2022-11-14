import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getCandidates,
  getUserCandidates,
  getCurrentCandidates,
} from '../store/actions';

class Candidates extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(id) {
    const { history } = this.props;
    history(`/candidates/${id}`);
  }

  componentDidMount() {
    const { getCandidates } = this.props;
    getCandidates();
  }

  render() {
    const { auth, getCandidates, getUserCandidates } = this.props;
    const candidates = this.props.candidates.map((candidate) => (
      <li onClick={() => this.handleSelect(candidate._id)} key={candidate._id}>
        {candidate.parties}
      </li>
    ));
    return (
      <Fragment>
        {auth.isAuthenticated && (
          <div className="buttons_center">
            <button className="button" onClick={getCandidates}>
              Default Parties
            </button>
            <button className="button" onClick={getUserCandidates}>
              My Parties
            </button>
          </div>
        )}
        <ul className="candidates">{candidates}</ul>
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    candidates: store.candidates,
  }),
  { getCandidates, getUserCandidates, getCurrentCandidates }
)(Candidates);
