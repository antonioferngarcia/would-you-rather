import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {

  static propTypes = {
    users: PropTypes.object,
    setAuthedUser: PropTypes.func,
    history: PropTypes.object,
    location:PropTypes.object
  };

  state = {
    anchorEl: null,
    selectedUser: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSelectClick = (user) => {
    console.log(user);
    this.setState({ selectedUser: user });
    this.handleClose();
  };

  renderSelectedUser = (user) => {
    return (
      <List onClick={this.handleClick} >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.avatarURL} />
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={
              <Fragment>
                @{user.id}
              </Fragment>
            }
          />
        </ListItem>
      </List>
    );
  };

  handleLoginClick = () => {
    const { setAuthedUser, history, location } = this.props;
    const from = location.state ? location.state.from : { pathname: '/' };
    setAuthedUser(this.state.selectedUser);
    history.push(from.pathname);
  };

  renderLoginButton = () => {
    return (
      <Button
        variant="outlined"
        size="large" color="primary"
        onClick={this.handleLoginClick}>
        Login User
      </Button>
    );
  };

  renderButton = () => {
    return (
      <Button
        variant="outlined"
        size="large" color="primary"
        onClick={this.handleClick}>
        Select User
      </Button>
    );
  };

  render() {
    const { users } = this.props;
    const { anchorEl, selectedUser } = this.state;

    return (
      <div className='login-container'>
        <Typography variant="h3">Login</Typography>
        <div className='login-select-wrapper'>
          {selectedUser ? this.renderSelectedUser(selectedUser) : this.renderButton()}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}>
            {
              Object.keys(users)
                .map(userKey =>
                  <MenuItem onClick={() => this.handleSelectClick(users[userKey])} key={userKey}>{users[userKey].name}</MenuItem>
                )
            }
          </Menu>
          {selectedUser && this.renderLoginButton()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: bindActionCreators(setAuthedUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);