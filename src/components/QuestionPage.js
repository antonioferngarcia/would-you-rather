import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import QuestionPoll from './QuestionPoll';
import QuestionResults from './QuestionResults';

class QuestionPage extends Component {

  static propTypes = {
    question: PropTypes.object,
    author: PropTypes.object,
    isQuestionAnswered: PropTypes.bool,
    authedUser: PropTypes.object,
    match: PropTypes.object
  };

  render() {
    const { question, author, isQuestionAnswered, match, authedUser } = this.props;

    if(!question) return <Redirect to={{ pathname: '/error' }} />;
    return (
      <div className='question-page'>
        <Paper elevation={4}>
          <div className='container'>
            <Typography variant="h5" component="h2">Asked by {author.name}</Typography>
            <hr/>
            <div className='question-content'>
              <div className='author'>
                <Avatar alt={author.name} src={author.avatarURL} />
                <Typography>@{author.id}</Typography>
              </div>
              <div className='vertical-separator'/>
              <div className='question-options'>
                { isQuestionAnswered ?
                  <QuestionResults authedUser={authedUser.id} optionOne={question.optionOne} optionTwo={question.optionTwo}/> :
                  <QuestionPoll questionId={match.params.questionId} optionOne={question.optionOne} optionTwo={question.optionTwo}/>
                }
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  let author;
  let isQuestionAnswered = false;
  const question = state.questions[props.match.params.questionId];
  if (question) {
    author = state.users[question.author];
    isQuestionAnswered = question.optionOne.votes.includes(state.authedUser.id) || question.optionTwo.votes.includes(state.authedUser.id);
  }
  return {
    question,
    author,
    isQuestionAnswered,
    authedUser: state.authedUser
  };
}

export default connect(mapStateToProps)(QuestionPage);