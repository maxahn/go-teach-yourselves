import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Question from '../Question';

const Module = ({title}) => (
  <div>
    <h2>MODULE: Beginner Java</h2>
    <button onClick={this.startModule}>START</button>
  </div>
)

class ModulePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      questions: [],
      isStarted: false,
      activeQuestionIndex: null,
      correctFeedbackOpen: false,
      incorrectFeedbackOpen: false,
      userAnswer: null,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.firebase.questions().once('value').then(snapshot => {
      this.setState({
        questions: snapshot.val().filter((obj) => obj),
        isLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.questions().off();
  }

  startModule = () => {
    this.setState({
      isStarted: true,
      activeQuestionIndex: 0,
    });
  }

  isAnswerCorrect = () => {
    const { userAnswer, questions, activeQuestionIndex } = this.state;
    const activeQuestion = questions[activeQuestionIndex];
    return userAnswer === activeQuestion.answer;
  }

  answerQuestion = (selectedAnswer, answer) => {
    let { activeQuestionIndex } = this.state;
    console.log({selectedAnswer, answer});
    let startState = (selectedAnswer === answer) ? 
      {
        correctFeedbackOpen: true
      } :
      {
        incorrectFeedbackOpen: true
      };
    startState.activeQuestionIndex = activeQuestionIndex + 1;
    this.setState(startState);
  }

  closeFeedback = () => {
    this.setState({
      incorrectFeedbackOpen: false,
      correctFeedbackOpen: false,
    });
  }

  render() {
    const { isLoading, questions, activeQuestionIndex, correctFeedbackOpen, incorrectFeedbackOpen, isStarted } = this.state;
    const isOver = activeQuestionIndex >= questions.length;
    const CorrectAnswerPage = () => {
      return (
        <div>
          <h3>Correct!</h3>
          <button onClick={this.closeFeedback}>Next</button>
        </div>
      );
    }

    const IncorrectAnswerPage = () => {
      return (
        <div>
          <h3>TESTING Sorry, that was incorrect. If you feel like you don't understand the question or answer, here are some other students you can ask for help:</h3>
          <ul>
            <li>
              <h5>Nara - nara@fakeemail.com</h5>
              <h5>Iman - iman@fakeemail.com</h5>
              <h5>Pbj - peanutbutterjelly@fakeemail.com</h5>
              <h5>Max - max@fakeemail.com</h5>
            </li>
          </ul>
          <button onClick={this.closeFeedback}>Next</button>
        </div>
      );
    }
    if (isLoading) {
      return (<div>Loading...</div>);
    } else if (isOver) {
      return (<div>Congratulations! You have completed the module!</div>);
    } else if (correctFeedbackOpen) {
      return (<CorrectAnswerPage />);
    } else if (incorrectFeedbackOpen) {
      return (<IncorrectAnswerPage />);
    } else if (isStarted) {
      const activeQuestion = questions[activeQuestionIndex];
      console.log({activeQuestion});
      if (activeQuestion) {
        const { Option1, Option2, Option3, answer} = activeQuestion;
        return (
          <Question
            question={activeQuestion.Question}
            option1={Option1}
            option2={Option2}
            option3={Option3}
            answer={answer}
            onSubmit={(event, selectedAnswer) => {
              event.preventDefault();
              this.answerQuestion(selectedAnswer, answer);
            }}
          />
        );
      } else {
        // return (<p>active question null</p>);
      }
    }
    return (
      <div>
        <h2>MODULE: Beginner Java</h2>
        <button onClick={this.startModule}>START</button>
      </div>
    );
  }
}



export default withFirebase(ModulePage);
export { Module };
