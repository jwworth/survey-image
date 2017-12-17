import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <ScoreForm />
        <ScoreTable />
      </div>
    );
  }
}

const ScoreForm = () => {
  return <form />;
};

const ScoreTable = () => {
  const scoreTree = [
    [0, 1, 2, 3, 0],
    [0, 5, 2, 3, 1],
    [0, 4, 2, 3, 0],
    [null, 1, 2, 3, 5],
    [5, 1, 0, 0, 0],
  ];

  const scoreToColor = score => {
    switch (score) {
      case 0:
        return '#680000';
      case 1:
        return '#880000';
      case 2:
        return '#A80000';
      case 3:
        return '#C80000';
      case 4:
        return '#E80000';
      case 5:
        return '#FF0000';
      default:
        return '#fff';
    }
  };

  const scoreRow = () => {
    return scoreTree.map(row => {
      return <tr>{scoreCells(row)}</tr>;
    });
  };

  const scoreCells = row => {
    return row.map(score => {
      return <td style={{ background: scoreToColor(score) }} />;
    });
  };

  return (
    <table
      style={{
        margin: '0 auto',
        border: '2px solid black',
        width: '500px',
        height: '500px',
      }}
    >
      {scoreRow()}
    </table>
  );
};

export default App;
