import React, { Component, Fragment } from 'react'
import { Router } from "react-router";
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import createBrowserHistory from "history/createBrowserHistory";
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import LoginPage from "./LoginPage";
import LeaderBoard from "./LeaderBoard";

const history = createBrowserHistory();

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router history={history} >
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav history={history}/>
            {/*this.props.loading === true
              ? null
              : */}
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

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)