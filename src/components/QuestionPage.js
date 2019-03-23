import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";


class QuestionPage extends Component {

  state = {};

  selectOption = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  sendVote = () => {
    console.log('send vote', this.state.selectedOption)
  };

  render() {
    const { question, author } = this.props;
    const { selectedOption } = this.state;

    if(!question) return <div/>;
    return (
      <div className='question-page'>
        <Paper elevation={4}>
          <div className='container'>
            <Typography variant="h5" component="h2">Asked by</Typography>
            <hr/>
            <div className='question-content'>
              <div className='author'>
                <Avatar alt={author.name} src={author.avatarURL} />
                <Typography>{author.name}</Typography>
              </div>
              <div className='vertical-separator'/>
              <div className='question-options'>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Would you rather ...</FormLabel>
                  <RadioGroup
                    value={selectedOption}
                    onChange={this.selectOption}>
                    <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
                    <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="outlined"
                  size="large" color="primary"
                  onClick={this.sendVote}>
                  Vote
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  let author;
  const question = state.questions[props.match.params.questionId];
  if (question) author = state.users[question.author];
  return {
    question,
    author
  }
}

export default connect(mapStateToProps)(QuestionPage)