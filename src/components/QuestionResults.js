import React, { Component, Fragment } from 'react';
import Typography from "@material-ui/core/Typography";
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckCircle from '@material-ui/icons/CheckCircle';

class QuestionResults extends Component {

  isOptionSelected = (option) => {
    const { authedUser } = this.props;
    return option.votes.includes(authedUser)
  };

  renderSelectedIcon = () => {
    return (
      <div className='selected-icon'>
        <CheckCircle color='secondary'/>
        <Typography color='secondary' variant='subtitle2'>My choice</Typography>
      </div>
    );
  };

  renderOptionResult = (option, totalVotes) => {
    const selectedOption = this.isOptionSelected(option);
    return (
      <div className={`question-result ${selectedOption ? 'selected': ''}`}>
        {selectedOption && this.renderSelectedIcon()}
        <Typography variant="subtitle1" >Would you rather {option.text}?</Typography>
        <LinearProgress variant={'determinate'} value={option.votes.length/totalVotes*100}/>
        <Typography variant="h6" >{option.votes.length} out of {totalVotes} votes</Typography>
      </div>
    );
  };

  render() {
    const { optionOne, optionTwo } = this.props;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    return (
      <Fragment>
        {this.renderOptionResult(optionOne, totalVotes)}
        {this.renderOptionResult(optionTwo, totalVotes)}
      </Fragment>
    );
  }
}

export default QuestionResults;