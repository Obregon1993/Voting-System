import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../store/actions';
import { Pie } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';
import Chart from 'chart.js/auto';
Chart.register(ArcElement);

const color = () => {
  return '#' + Math.random().toString('16').slice(2, 8);
};

const Candidate = ({ candidates, vote }) => {
  const answers =
    candidates.options &&
    candidates.options.map((option) => (
      <button
        onClick={() => vote(candidates._id, { answer: option.option })}
        key={option._id}
      >
        {option.option}
      </button>
    ));

  const data = candidates.options && {
    labels: candidates.options.map((option) => {
      return option.option;
    }),
    datasets: [
      {
        label: candidates.parties,
        backgroundColor: candidates.options.map((option) => color()),
        borderColor: '#323643',
        data: candidates.options.map((option) => option.votes),
      },
    ],
  };

  return (
    <div>
      <h3>{candidates.parties}</h3>
      <div>{answers}</div>
      <div id="myChart">
        {candidates.options && (
          <Pie
            data={data}
            width={300}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </div>
    </div>
  );
};

export default connect(
  (store) => ({
    candidates: store.currentCandidates,
  }),
  { vote }
)(Candidate);
