import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import Paper from "@material-ui/core/Paper";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {FormControl, RadioGroup} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";

class Home extends Component {

  state = { filterValue: 'answered' };

  handleCardClick = question => {
    const { history } = this.props;
    history.push(`/questions/${question.id}`);
  };

  toggleQuestionFilter = (event) => {
    this.setState({ filterValue: event.target.value })
  };

  render() {
    const {users, questionsAnswered, questionsNotAnswered} = this.props;
    const { filterValue } = this.state;

    const questions = filterValue === 'answered' ? questionsAnswered : questionsNotAnswered;
    console.log(questionsAnswered, questionsNotAnswered);
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
              <div className='question-card' key={question.id} onClick={() => this.handleCardClick(question)}>
                <Paper elevation={4}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={users[question.author].name}
                      secondary={
                        <Fragment>
                          @{users[question.author].id}
                        </Fragment>
                      }
                    />
                  </ListItem>
                  <div className='text-wrapper'>
                    <Typography variant="h5" component="h2">
                      Would you rather...
                    </Typography>
                    <Typography>
                      {question.optionOne.text}
                    </Typography>
                    <Typography>
                      {question.optionTwo.text}
                    </Typography>
                  </div>
                </Paper>
              </div>
            ))}
          </div>

        </ul>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    questionsAnswered: Object.values(state.questions)
      .filter(question =>
        question.optionOne.votes.includes(state.authedUser.id) || question.optionTwo.votes.includes(state.authedUser.id))
      .sort((a,b) => b.timestamp - a.timestamp),
    questionsNotAnswered: Object.values(state.questions)
      .filter(question =>
        !question.optionOne.votes.includes(state.authedUser.id) && !question.optionTwo.votes.includes(state.authedUser.id))
      .sort((a,b) => b.timestamp - a.timestamp),
    questions: Object.values(state.questions)
      .sort((a,b) => b.timestamp - a.timestamp),
    users: state.users
  }
}

export default connect(mapStateToProps)(Home)