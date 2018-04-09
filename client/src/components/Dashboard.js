import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {

  componentDidMount() {
		const { sources, fetchSources } = this.props;
		if (sources && sources.length === 0) {
  		fetchSources();
		}
	}

  render() {
    return (
      <div>
        The DashBoard
      </div>
    );
  }
}

function mapStateToProps({ sources }) {
  return { sources };
}

export default connect(mapStateToProps, actions)(Dashboard);
