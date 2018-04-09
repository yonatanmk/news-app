import React, { Component } from 'react';
import { connect } from 'react-redux';
import SourceBox from './SourceBox';

class Dashboard extends Component {
  renderSources() {
    const { sources } = this.props;
    return sources.map(source => (
      <SourceBox
        key={source.id}
        source={source}
      />
    ));
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

export default connect(mapStateToProps)(Dashboard);
