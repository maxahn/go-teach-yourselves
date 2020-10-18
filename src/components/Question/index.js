import React, { Component } from 'react';

const INITIAL_STATE = {
  selectedOption: null,
  selectedOption1: false,
  selectedOption2: false,
  selectedOption3: false,
};

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null 
    }
  }

  onSubmit = event => {
    event.preventDefault();
  }

  onChange(selectedOption) {
    this.setState({ selectedOption });
  }

  render() {
    const { question, option1, option2, option3, answer, onSubmit } = this.props;
    const { selectedOption } = this.state;
    return (
      <div>
        <h3> Question: {question}</h3>
        <form onSubmit={(event) => onSubmit(event, selectedOption)}>
          <div>
            <input
              type='radio' id='option1' name='option1' value={option1} checked={option1 === selectedOption}
              onChange={() => this.onChange(option1)}
            />
            <label for='option1'>{option1}</label>
          </div>
          <div>
            <input
              type='radio' id='option2' name='option2' value={option2} checked={option2 === selectedOption} 
              onChange={() => this.onChange(option2)}
            />
            <label for='option2'>{option2}</label>
          </div>
          <div>
            <input 
              type='radio' id='option3' name='option3' value={option3} checked={option3 === selectedOption}
              onChange={() => this.onChange(option3)}
            />
            <label for='option3'>{option3}</label>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}
