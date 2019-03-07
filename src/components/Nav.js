import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Nav  extends Component {

  state = {
    tabs: [
      {
        label: 'Home',
        linkTo: ''
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
  }

  handleChange = (event, selectedTab) => {
    const { handleNavigation } = this.props;
    const { tabs } = this.state;
    this.setState({ selectedTab });
    handleNavigation(tabs[selectedTab].linkTo);
  };

  render() {
    const { selectedTab, tabs } = this.state;

    return (
      <Tabs
        value={selectedTab}
        onChange={this.handleChange}
        indicatorColor="primary"
        textColor="primary" >
        {tabs.map(tab =>  <Tab key={tab.label} label={tab.label} />)}
      </Tabs>
    )
  }
}

export default Nav;