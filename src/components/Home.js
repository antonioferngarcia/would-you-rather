import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl, RadioGroup } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import QuestionCard from './QuestionCard';
import PropTypes from 'prop-types';

class Home extends Component {

  static propTypes = {
    users: PropTypes.object,
    questionsAnswered: PropTypes.array,
    questionsNotAnswered: PropTypes.array,
    authedUser: PropTypes.object,
    history: PropTypes.object,
  };

  state = { filterValue: 'answered' };

  handleCardClick = question => {
    const { history } = this.props;
    history.push(`/questions/${question.id}`);
  };

  toggleQuestionFilter = (event) => {
    this.setState({ filterValue: event.target.value });
  };

  render() {
    const { users, questionsAnswered, questionsNotAnswered, authedUser } = this.props;
    const { filterValue } = this.state;
    const questions = filterValue === 'answered' ? questionsAnswered : questionsNotAnswered;

    return (
      <div>
        <h3 className='center'>List of questions</h3>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={filterValue}
            onChange={this.toggleQuestionFilter}>
            <FormControlLabel value="answered" control={<Radio />} label="Answered questions" />
            <FormControlLabel value="notAnswered" control={<Radio />} label="Not answered questions" />
          </RadioGroup>
        </FormControl>
        <ul className='dashboard-list'>
          <div className='questions-list'>
            {questions.length && questions.map(question => (
              <QuestionCard key={question.id}
                authedUser={authedUser}
                handleCardClick={this.handleCardClick}
                question={question}
                author={users[question.author]}
                filterValue={filterValue}/>
            ))}
          </div>

        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questionsAnswered: Object.values(state.questions)
      .filter(question =>
        question.optionOne.votes.includes(state.authedUser.id) || question.optionTwo.votes.includes(state.authedUser.id))
      .sort((a, b) => b.timestamp - a.timestamp),
    questionsNotAnswered: Object.values(state.questions)
      .filter(question =>
        !question.optionOne.votes.includes(state.authedUser.id) && !question.optionTwo.votes.includes(state.authedUser.id))
      .sort((a, b) => b.timestamp - a.timestamp),
    users: state.users,
    authedUser: state.authedUser
  };
}

export default connect(mapStateToProps)(Home);