import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

class LeaderBoard extends Component {

  static propTypes = {
    authors: PropTypes.array
  };

  renderPosition = (position) => {
    switch (position) {
      case 0:
        return <div className='first-position'>1st</div>;
      case 1:
        return <div className='second-position'>2nd</div>;
      case 2:
        return  <div className='third-position'>3rd</div>;
      default:
        return  null;
    }
  };

  render() {
    const { authors } = this.props;

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
                    <div className='questions-detail'>
                      <Typography variant="h6">Answered questions</Typography>
                      <Typography variant="h5" color="primary">{author.votes.length}</Typography>
                    </div>
                    <div className='questions-detail'>
                      <Typography variant="h6">Created questions</Typography>
                      <Typography variant="h5" color="primary">{author.questions.length}</Typography>
                    </div>
                  </div>
                  <div className='vertical-separator'/>
                  <div className='score'>
                    <Typography variant="subtitle2" color='secondary'>Total score </Typography>
                    <Typography variant="h3" color='secondary'>{author.score}</Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authors: Object.values(state.users)
      .map(user => {
        user.questions = Object.values(state.questions)
          .filter(question => question.author === user.id);
        user.votes = Object.values(state.questions)
          .filter(question =>
            question.optionOne.votes.includes(user.id) ||
            question.optionTwo.votes.includes(user.id)
          );
        user.score = user.questions.length + user.votes.length;
        return user;
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  };
}

export default connect(mapStateToProps)(LeaderBoard);