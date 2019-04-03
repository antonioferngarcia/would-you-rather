import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

class AuthorCard extends Component {

  renderPosition = (position) => {
    switch (position) {
      case 1:
        return <div className='first-position'>1st</div>;
      case 2:
        return <div className='second-position'>2nd</div>;
      case 3:
        return  <div className='third-position'>3rd</div>;
      default:
        return  null;
    }
  };

  render() {
    const { author, position } = this.props;
    return (
      <div className='author-card-wrapper'>
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
              {this.renderPosition(position)}
            </ListItem>
            <div className='info-container'>
              <div className='questions-details'>
                <div className='questions-detail'>
                  <Typography variant="h6">Answered questions</Typography>
                  <Typography variant="h5" color="primary">{author.answers.length}</Typography>
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
    );
  }
}

AuthorCard.propTypes = {
  author: PropTypes.object,
  position: PropTypes.number
};

export default AuthorCard;
