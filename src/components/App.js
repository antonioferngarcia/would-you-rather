import React, { Component, Fragment } from 'react'
import { bindActionCreators } from "redux";
import { Router } from "react-router";
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from "prop-types";
import LoadingBar from 'react-redux-loading'

import createBrowserHistory from "history/createBrowserHistory";
import { handleInitialData } from '../actions/shared'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import LeaderBoard from "./LeaderBoard";
import LoginPage from "./LoginPage";
import Home from './Home'
import Nav from './Nav'

const history = createBrowserHistory();

class App extends Component {
  static propTypes = {
    handleInitialData: propTypes.func
  };

  componentDidMount() {
    const { handleInitialData } = this.props;
    handleInitialData()
  }

  render() {
    return (
      <Router history={history} >
        <Fragment>
          <LoadingBar />
          <Nav history={history}/>
          <div className='container'>
            <div className='routes-wrapper'>
              <Route path='/' exact component={Home} />
              <Route path='/login' exact component={LoginPage} />
              <Route path='/leaderboard' exact component={LeaderBoard} />
              <Route path='/questions/:questionId' component={QuestionPage} />
              <Route path='/add' component={NewQuestion} />
            </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: bindActionCreators(handleInitialData, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(App)