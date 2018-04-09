import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {

  componentDidUpdate() {
		const { fetchSources } = this.props;
		// if (user && user.bbgUsername && games.length === 0) {
		fetchSources();
		// }
	}

  render() {
    return (
      <div>
        The DashBoard
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Dashboard);
