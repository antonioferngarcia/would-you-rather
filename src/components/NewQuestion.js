import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import { sendQuestion } from '../actions/questions';

class NewQuestion extends Component {

  static propTypes = {
    sendQuestion: PropTypes.func,
    author: PropTypes.string,
    history: PropTypes.object
  };

  state = {
    optionOne: '',
    optionTwo: '',
    disabled: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleNewQuestion = async() => {
    const { optionOne, optionTwo } = this.state;
    const { sendQuestion, author, history } = this.props;

    this.setState({ disabled : true });
    await sendQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author
    });

    history.push('/');
  };

  render() {
    const { optionOne, optionTwo, disabled } = this.state;

    return (
      <div className='new-question-container'>
        <Typography variant="h3">Create new question</Typography>
        <div className='new-question-card-wrapper'>
          <Paper elevation={4}>
            <form noValidate autoComplete="off">
              <FormControl required>
                <div className='new-question-card'>
                  <Typography variant="h5">Would you rather ...?</Typography>
                  <div className='inputs-wrapper'>
                    <TextField
                      id="outlined-name"
                      label="First option"
                      value={optionOne}
                      onChange={this.handleChange('optionOne')}
                      variant="outlined"
                    />
                    <Typography variant="subtitle1">or</Typography>
                    <TextField
                      id="outlined-name"
                      label="Second option"
                      value={optionTwo}
                      onChange={this.handleChange('optionTwo')}
                      variant="outlined"
                    />
                  </div>
                  <Button
                    disabled={!optionOne.length && !optionTwo.length}
                    variant="outlined"
                    disabled={disabled}
                    size="large" color="primary"
                    onClick={this.handleNewQuestion}>
                    Submit
                  </Button>
                </div>
              </FormControl>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    author: state.authedUser ? state.authedUser.id : ''
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendQuestion: bindActionCreators(sendQuestion, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);