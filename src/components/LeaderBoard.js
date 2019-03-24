import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";


class LeaderBoard extends Component {

  renderPosition = (position) => {
    switch (position) {
      case 0:
        return <div className='first-position'>1st</div>;
      case 1:
        return <div className='second-position'>2nd</div>;
      case 2:
        return  <div className='third-position'>3rd</div>;
    }
  };

  render() {
    const { authors } = this.props;

    console.log(authors);
    return (
      <div className='leaderboard-container'>
        <Typography variant="h3">LeaderBoard</Typography>
        {authors.map((author, index) => (
          <div key={author.id} className='author-card-wrapper'>
            <Paper elevation={4}>
              <div className='author-card'>
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
                  {this.renderPosition(index)}
                </ListItem>
                <div className='info-container'>
                  <div className='questions-details'>
                    <Typography variant="h5" component="h2">
                      Answered questions {author.votes.length}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Created questions {author.questions.length}
                    </Typography>
                  </div>
                  <div className='vertical-separator'/>
                  <div className='score'>
                    <Typography variant="h5" component="h2">
                      Total score {author.score}
                    </Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    authors: Object.values(state.users)
      .map(user => {
        user.questions = Object.values(state.questions)
          .filter(question => question.author === user.id);
        user.votes = user.questions
          .map(question => question.optionOne.votes.concat(question.optionTwo.votes))
          .flat();
        user.score = user.questions.length + user.votes.length;
        return user;
      })
      .sort((a,b) => b.score - a.score)
      .slice(0, 3)
  }
}

export default connect(mapStateToProps)(LeaderBoard)