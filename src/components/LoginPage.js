import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Login extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSelectClick = (user) => {
    console.log(user);
    this.handleClose();
  };

  render() {
    const { users } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <h3 className='center'>Login</h3>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick} >
        Open Menu
      </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          {
            Object.keys(users)
                .map(userKey =>
                    <MenuItem onClick={() => this.handleSelectClick(users[userKey])} key={userKey}>{users[userKey].name}</MenuItem>
                )}

        </Menu>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Login);