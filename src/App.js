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

    this.state = {
      scoreTree: [
        [0, 1, 2, 3, 0],
        [0, 5, 2, 3, 1],
        [0, 4, 2, 3, 0],
        [null, 1, 2, 3, 5],
        [5, 1, 0, 0, 0],
      ],
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
        <ScoreForm scoreTree={this.state.scoreTree} />
        <ScoreTable scoreTree={this.state.scoreTree} />
      </div>
    );
  }
}

const InnerScoreForm = props => {
  const scoreTree = props.values.scoreTree;
  let questionNumber = 0;
  return (
    <form>
      {scoreTree.map(scoreRow => {
        return scoreRow.map((score, index) => {
          questionNumber++;
          return (
            <div>
              <label>Question #{questionNumber}:</label>
              <input type="text" value={score} />
            </div>
          );
        });
      })}
    </form>
  );
};

const ScoreForm = withFormik({
  mapPropsToValues: props => ({ scoreTree: props.scoreTree }),
})(InnerScoreForm);

const ScoreTable = props => {
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

  const scoreRow = scoreTree => {
    return scoreTree.map((row, index) => {
      return <tr key={index}>{scoreCells(row)}</tr>;
    });
  };

  const scoreCells = row => {
    return row.map((score, index) => {
      return <td key={index} style={{ background: scoreToColor(score) }} />;
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
        {scoreRow(props.scoreTree)}
      </tbody>
    </table>
  );
};

export default App;
