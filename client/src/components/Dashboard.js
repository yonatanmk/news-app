import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SourceBox from './SourceBox';

class Dashboard extends Component {

  componentDidMount() {
		const { sources, fetchSources } = this.props;
		if (sources && sources.length === 0) {
  		fetchSources();
		}
	}

  renderSources() {
    const { sources } = this.props;
    return sources.map(source => {
      return (
        <SourceBox
          key={source.id}
          name={source.name}
          description={source.description}
          onClick={() => console.log(source.name)} />
      );
    });
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
