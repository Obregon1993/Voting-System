import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createCandidates } from '../store/actions';

class CreateCandidates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parties: '',
      options: ['', ''],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addAnswer() {
    this.setState({ options: [...this.state.options, ''] });
  }

  handleAnswer(event, index) {
    const options = [...this.state.options];
    options[index] = event.target.value;
    this.setState({ options });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createCandidates(this.state);
  }

  render() {
    const options = this.state.options.map((option, index) => (
      <Fragment key={index}>
        <label>option</label>
        <input
          type="text"
          value={option}
          key={index}
          onChange={(event) => this.handleAnswer(event, index)}
        />
      </Fragment>
    ));

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="parties">Party</label>
        <input
          id="parties"
          type="text"
          name="parties"
          value={this.state.parties}
          onChange={this.handleChange}
        />

        {options}

        <button type="button" onClick={this.addAnswer}>
          Add option
        </button>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default connect(() => ({}), { createCandidates })(CreateCandidates);
