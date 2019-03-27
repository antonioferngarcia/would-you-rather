import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Router, Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import LoadingBar from 'react-redux-loading';

import createBrowserHistory from 'history/createBrowserHistory';
import { handleInitialData } from '../actions/shared';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';
import LeaderBoard from './LeaderBoard';
import LoginPage from './LoginPage';
import Home from './Home';
import Nav from './Nav';
import NotFound from './NotFound';

const history = createBrowserHistory();

class App extends Component {
  static propTypes = {
    handleInitialData: propTypes.func,
    authedUser: propTypes.object
  };

  componentDidMount() {
    const { handleInitialData } = this.props;
    handleInitialData();
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router history={history} >
        <Fragment>
          <LoadingBar />
          <Nav history={history}/>
          <div className='container'>
            <div className='routes-wrapper'>
              <Switch>
                <PrivateRoute authedUser={authedUser} path='/' exact component={Home} />
                <Route path='/login' exact component={LoginPage} />
                <PrivateRoute authedUser={authedUser} path='/leaderboard' exact component={LeaderBoard} />
                <PrivateRoute authedUser={authedUser} path='/questions/:questionId' component={QuestionPage} />
                <PrivateRoute authedUser={authedUser} path='/add' component={NewQuestion} />
                <Route path='*' component={NotFound} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: bindActionCreators(handleInitialData, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.authedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: propTypes.func,
  location: propTypes.object
};