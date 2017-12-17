import React, { Component } from 'react';
import { withFormik } from 'formik';
import './App.css';

class App extends Component {
  render() {
    return <SurveyImage />;
  }
}

class SurveyImage extends Component {
  constructor(props) {
    super(props);

    const emtpyArray = [];
    emtpyArray.length = 5;

    this.state = {
      scoreTree: [emtpyArray, emtpyArray, emtpyArray, emtpyArray, emtpyArray],
    };
  }

  render() {
    return (
      <div>
        <h1>Survey Image</h1>
        <h3>
          For each question mark a number which represents your situation most closely:
        </h3>
        <p>
          0 = Not at All
          1 = Somewhat
          2 = Moderately
          3 = A Lot
          4 = Extremely
        </p>
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
      <tbody>
        {scoreRow()}
      </tbody>
    </table>
  );
};

export default App;
