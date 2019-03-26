import React, { Component, Fragment } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendAnswer } from '../actions/questions';

class QuestionPoll extends Component {

  static propTypes = {
    optionOne: PropTypes.object,
    optionTwo: PropTypes.object,
    sendAnswer: PropTypes.func,
    questionId: PropTypes.string,
  };

  state = {};

  selectOption = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  sendVote = () => {
    const { sendAnswer, questionId } = this.props;
    const { selectedOption } = this.state;
    console.log('send vote', selectedOption);
    sendAnswer(questionId, selectedOption);
  };

  render() {
    const { optionOne, optionTwo } = this.props;
    const { selectedOption } = this.state;

    return (
      <Fragment>
        <FormControl component="fieldset">
          <FormLabel component="legend">Would you rather ...</FormLabel>
          <RadioGroup
            value={selectedOption}
            onChange={this.selectOption}>
            <FormControlLabel value="optionOne" control={<Radio />} label={optionOne.text} />
            <FormControlLabel value="optionTwo" control={<Radio />} label={optionTwo.text} />
          </RadioGroup>
        </FormControl>
        <Button
          variant="outlined"
          disabled={!selectedOption}
          size="large" color="primary"
          onClick={this.sendVote}>
          Vote
        </Button>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendAnswer: bindActionCreators(sendAnswer, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(QuestionPoll);
