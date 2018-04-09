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

  renderSources() {
    const { sources } = this.props;
    return sources.map(source => (
      <div className="source-box" key={source.id} onClick={() => console.log(source.name)}>
        <h2>{source.name}</h2>
        <p>{source.description}</p>
      </div>
    ))
  }

  render() {
    return (
      <div>
        {this.renderSources()}
      </div>
    );
  }
}

function mapStateToProps({ sources }) {
  return { sources };
}

export default connect(mapStateToProps, actions)(Dashboard);
