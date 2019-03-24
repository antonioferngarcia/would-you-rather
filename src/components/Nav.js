import React, { Component, Fragment } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { matchPath } from "react-router";
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Nav  extends Component {

  state = {
    tabs: [
      {
        label: 'Home',
        linkTo: '/'
      },
      {
        label: 'New Question',
        linkTo: '/add'
      },
      {
        label: 'Leaderboard',
        linkTo: '/leaderboard'
      }
    ],
    selectedTab: 0
    // selectedTab: -1
  };

  componentDidMount() {
    this.setSelectedTab();
  }

  handleChange = (event, selectedTab) => {
    const { history } = this.props;
    const { tabs } = this.state;
    this.setState({ selectedTab });
    history.push(tabs[selectedTab].linkTo);
    this.setSelectedTab(null);
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLogout = () => {
    this.setState({ anchorEl: null });
    this.props.setAuthedUser();
  };

  setSelectedTab = () => {
    const { tabs } = this.state;

    tabs.forEach((tab, index) => {
      const match = this.matchRoute(tab.linkTo);
      if(match && match.isExact) {
        this.setState({ selectedTab: index });
      }
    })
  };

  matchRoute = (path) => {
    return matchPath(this.props.history.location.pathname, {
      path,
      exact: true,
      strict: true
    });
  };

  render() {
    const { selectedTab, tabs, anchorEl } = this.state;
    const { authedUser } = this.props;

    const auth = Boolean(authedUser);
    const open = Boolean(anchorEl);
    return (
      <Fragment>
        <AppBar position="sticky" color='inherit'>
          <Toolbar>
            <Tabs
              value={selectedTab}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary" >
              {tabs.map(tab =>  <Tab key={tab.label} label={tab.label} />)}
            </Tabs>
            {auth && (
              <div>
                <IconButton
                  onClick={this.handleMenu}
                  color="inherit"
                >
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
            )}
          </Toolbar>
        </AppBar>
      </Fragment>
    )
  }
}


function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}


function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: bindActionCreators(setAuthedUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)