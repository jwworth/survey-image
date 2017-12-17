import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <ScoreTable />
      </div>
    );
  }
}

const ScoreTable = () => {
  const scoreTree = [
    [0, 1, 2, 3, 0],
    [0, 1, 2, 3, 1],
    [0, 4, 2, 3, 0],
    [0, 1, 2, 3, 5],
    [5, 1, 2, 3, 0],
  ];

  const scoreToColor = score => {
    switch (score) {
      case 0:
        return 'red';
      case 1:
        return 'yellow';
      case 2:
        return 'green';
      case 3:
        return 'blue';
      case 4:
        return 'purple';
      default:
        return 'black';
    }
  };

  const scoreRow = index => {
    return scoreTree[index].map(score => {
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
      <tr>{scoreRow(0)}</tr>
      <tr>{scoreRow(1)}</tr>
      <tr>{scoreRow(2)}</tr>
      <tr>{scoreRow(3)}</tr>
      <tr>{scoreRow(4)}</tr>
    </table>
  );
};

export default App;
