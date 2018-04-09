import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Source from './Source';

class App extends Component {
  componentDidMount() {
    const { sources, fetchUser, fetchSources } = this.props;
    fetchUser();
    if (sources && sources.length === 0) {
  		fetchSources();
		}
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Dashboard} />
            <Route exact path="/source/:id" component={Source} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({ sources }) {
  return { sources };
}

export default connect(mapStateToProps, actions)(App);
