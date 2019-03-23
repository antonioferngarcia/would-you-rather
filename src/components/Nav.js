import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { matchPath } from "react-router";

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
    this.setSelectedTab();
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
    const { selectedTab, tabs } = this.state;

    return (
      <Tabs
        value={selectedTab}
        onChange={this.handleChange}
        indicatorColor="primary"
        textColor="primary" >
        {tabs.map(tab =>  <Tab key={tab.label} label={tab.label} />)}ma
      </Tabs>
    )
  }
}

export default Nav;