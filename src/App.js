import React, { Component } from 'react';
import { withFormik } from 'formik';

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
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
      ],
    };
  }

  updateScoreTree = scoreTree => {
    this.setState({ scoreTree });
  };

  render() {
    return (
      <div>
        <h1>Survey Image</h1>
        <h3>
          For each question, choose the number which represents your answer:
        </h3>
        <p>
          1 = Most of the time
          2 = Often
          3 = Sometimes
          4 = Rarely
          5 = Never
        </p>
        <ScoreForm
          scoreTree={this.state.scoreTree}
          updateScoreTree={this.updateScoreTree}
        />
        <ScoreTable scoreTree={this.state.scoreTree} />
      </div>
    );
  }
}

const InnerScoreForm = ({ setFieldValue, updateScoreTree, values }) => {
  const { scoreTree } = values;
  let questionNumber = 0;

  return (
    <form>
      {scoreTree.map((scoreRow, scoreRowIndex) => {
        return scoreRow.map((score, scoreIndex) => {
          questionNumber++;
          const name = `scoreTree[${scoreRowIndex}][${scoreIndex}]`;
          const value = scoreTree[scoreRowIndex][scoreIndex];

          return (
            <div key={name}>
              <label>Question #{questionNumber}:</label>
              <input
                type="range"
                max="5"
                min="1"
                step="1"
                name={name}
                value={value}
                onChange={e => {
                  let newScores = scoreTree;
                  const score = Number(e.target.value);
                  newScores[scoreRowIndex][scoreIndex] = score;
                  setFieldValue('scoreTree', newScores);
                  updateScoreTree(newScores);
                }}
              />
              Score: {value}
            </div>
          );
        });
      })}
    </form>
  );
};

const ScoreForm = withFormik({
  mapPropsToValues: ({ scoreTree }) => ({ scoreTree }),

  updateScoreTree: (scoreTree, { props }) => {
    props.updateScoreTree(scoreTree);
  },
})(InnerScoreForm);

const ScoreTable = props => {
  const scoreToColor = score => {
    switch (score) {
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
