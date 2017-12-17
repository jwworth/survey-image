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
        <h1>Burnout Test (Non-Service Fields)</h1>
        <h3>
          For each question, choose the number which represents your answer:
        </h3>
        <p>
          1 = Strongly agree
          2 = Agree
          3 = Somewhat agree/disagree
          4 = Disagree
          5 = Strongly disagree
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

  const copy = [
    'There is too much weight on my shoulders.',
    'I no longer really care about doing my work well.',
    'I feel frustrated with my work.',
    'I have lost interest in my work.',
    "I just can't seem to handle all the requirements of my job.",
    'I feel alienated from my job and/or co-workers.',
    'I have enough energy to maintain a satisfactory job performance.',
    'My life is way too stressful',
    'Considering my workload, there is no way I can do my job properly.',
    'At the end of my working day, I find myself feeling emotionally empty.',
    'I feel that my job makes a difference.',
    'I have enough strength to satisfactorily perform all my duties.',
    'When I wake up in the morning, just thinking about the work that awaits me makes me feel tired.',
    'My work is too physically demanding.',
    'My work is too emotionally demanding.',
    "I don't really care about the results of my work.",
    'I find my work to be exhausting.',
    'The simple thought of a full work day makes me ill.',
    'I feel energetic.',
    'The amount of stress I deal with at work is more than I can handle.',
    'I think I work far too muc',
    'My work brings me satisfaction.',
    'Overall, I simply feel really exhausted.',
    'I find joy in my work.',
    'The work I do drains all of my energy.',
    'I feel overwhelmed by the amount of work that is expected of me.',
    'I feel that my boss and/or co-workers expect far too much of me.',
    "When I'm stressed I'm able to calm myself down.",
    'When I have too much work, I ask for help from co-workers or my boss if possible.',
    'I get discouraged easily.',
    'I take very little, if any time, to relax.',
    'I find myself so overwhelmed with work that I just shut down completely',
    'I tend to keep my problems to myself.',
    'I feel trapped in my job.',
    "I feel as though no matter what I do, there's nothing that can help make my job easier.",
    'I feel helpless.',
    'I have absolutely no say in any of the decisions made at work.',
    "At the end of my work day, I really feel like I've accomplished something.",
    'I complete my work at my own pace.',
    'I am happy with the amount of independence I have at work.',
    'I have no control over my workload.',
    'I actively participate in meetings or discussions at work.',
    'I feel underappreciated at work.',
    'I feel as though I have no control over my job.',
    "Even when things get hectic at work, I'm confident that I can handle it.",
  ];

  return (
    <form>
      {scoreTree.map((scoreRow, scoreRowIndex) => {
        return scoreRow.map((score, scoreIndex) => {
          questionNumber++;
          if (questionNumber <= 45) {
            const name = `scoreTree[${scoreRowIndex}][${scoreIndex}]`;
            const value = scoreTree[scoreRowIndex][scoreIndex];

            return (
              <div key={name}>
                <label>{questionNumber}. {copy[questionNumber - 1]}</label>
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
          } else {
            return <div />;
          }
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
  const colors = ['#880000', '#A80000', '#C80000', '#E80000', '#FF0000'];

  const scoreRow = scoreTree => {
    return scoreTree.map((row, index) => {
      return <tr key={index}>{scoreCells(row)}</tr>;
    });
  };

  const scoreCells = row => {
    return row.map((score, index) => {
      return <td key={index} style={{ background: colors[score - 1] }} />;
    });
  };

  return (
    <table
      style={{
        margin: '0 auto',
        border: '2px solid black',
        width: '700px',
        height: '700px',
      }}
    >
      <tbody>
        {scoreRow(props.scoreTree)}
      </tbody>
    </table>
  );
};

export default App;
