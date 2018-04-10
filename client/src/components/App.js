import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import Notifications from 'react-notify-toast';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Source from './Source';
import Profile from './Profile';


class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate() {
    const { user, sources, fetchSources } = this.props;
    if (user && sources && sources.length === 0) {
      fetchSources();
		}
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className="container">
        <Notifications />
        <Router>
          <div>
            <Header />
            {!isFetching && <Route exact path="/" component={Landing} />}
            {!isFetching && <Route exact path="/home" component={Dashboard} />}
            {!isFetching && <Route exact path="/source/:id" component={Source} />}
            {!isFetching && <Route exact path="/profile" component={Profile} />}
          </div>
        </Router>
        {isFetching &&
          <div className="loading-container">
            <RingLoader
              color="#41D6B7"
              size={200}
              loading={isFetching}
            />
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ user, sources, isFetching }) {
  return { user, sources, isFetching };
}

export default connect(mapStateToProps, actions)(App);
