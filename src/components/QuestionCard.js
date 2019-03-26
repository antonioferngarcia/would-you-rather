import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class QuestionCard extends Component {

  static propTypes = {
    question: PropTypes.object,
    author: PropTypes.object,
    authedUser: PropTypes.object,
    filterValue: PropTypes.string,
    handleCardClick: PropTypes.func,
  };

  renderSelectedOption = (question) => {
    const { authedUser } = this.props;
    let option = question.optionTwo;
    if(question.optionOne.votes.includes(authedUser.id)) {
      option = question.optionOne;
    }
    return (
      <Typography>
        {option.text}
      </Typography>
    );
  };

  render() {
    const { question, author, filterValue, handleCardClick } = this.props;

    return (
      <div className='question-card' onClick={() => handleCardClick(question)}>
        <Paper elevation={4}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={author.name} src={author.avatarURL} />
            </ListItemAvatar>
            <ListItemText
              primary={author.name}
              secondary={
                <Fragment>
                  @{author.id}
                </Fragment>
              }
            />
          </ListItem>
          <div className='text-wrapper'>
            <Typography variant="h5" component="h2">
              Would you rather...
            </Typography>
            {filterValue === 'answered' && this.renderSelectedOption(question)}
          </div>
        </Paper>
      </div>
    );
  }
}

export default QuestionCard;