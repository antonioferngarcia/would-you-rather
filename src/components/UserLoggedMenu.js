import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/es/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/es/MenuItem';
import Menu from '@material-ui/core/es/Menu';

import { setAuthedUser } from '../actions/authedUser';

class UserLoggedMenu extends Component {

  state = {};

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    const { setAuthedUser } = this.props;
    this.setState({ anchorEl: null });
    setAuthedUser();
  };

  render() {
    const { anchorEl } = this.state;
    const { authedUser } = this.props;

    const auth = Boolean(authedUser);
    if(!auth) {
      return <div/>;
    }
    const open = Boolean(anchorEl);
    return (
      <div className='authed-user'>
        <Typography>Hello {authedUser.name}!</Typography>
        <IconButton onClick={this.handleMenu} color='primary'>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

UserLoggedMenu.propTypes = {
  setAuthedUser: PropTypes.func,
  authedUser: PropTypes.object
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: bindActionCreators(setAuthedUser, dispatch)
  };
}

export default  connect(mapStateToProps, mapDispatchToProps)(UserLoggedMenu);
