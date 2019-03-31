import React, { Component, Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { matchPath } from 'react-router';
import AppBar from '@material-ui/core/es/AppBar/AppBar';
import Toolbar from '@material-ui/core/es/Toolbar/Toolbar';
import PropTypes from 'prop-types';

import UserLoggedMenu from './UserLoggedMenu';

class Nav  extends Component {

  static propTypes = {
    history: PropTypes.object
  };

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
    selectedTab: -1
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

  setSelectedTab = () => {
    const { tabs } = this.state;

    tabs.forEach((tab, index) => {
      const match = this.matchRoute(tab.linkTo);
      if(match && match.isExact) {
        this.setState({ selectedTab: index });
      }
    });
  };

  matchRoute = (path) => {
    return matchPath(this.props.history.location.pathname, {
      path,
      exact: true,
      strict: true
    });
  };

  render() {
    const { selectedTab, tabs } = this.state;
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
            <UserLoggedMenu/>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

export default Nav;