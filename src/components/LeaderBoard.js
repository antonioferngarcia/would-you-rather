import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AuthorCard from './AuthorCard';

class LeaderBoard extends Component {

  static propTypes = {
    authors: PropTypes.array
  };

  render() {
    const { authors } = this.props;

    return (
      <div className='leaderboard-container'>
        <Typography variant="h3">LeaderBoard</Typography>
        {authors.map((author, index) => (
          <AuthorCard key={author.id} author={author} position={index + 1}/>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authors: Object.values(state.users)
      .map(user => {
        user.answers = Object.keys(user.answers);
        user.score = user.questions.length + user.answers.length;
        return user;
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  };
}

export default connect(mapStateToProps)(LeaderBoard);