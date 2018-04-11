import React, { Component } from 'react';
import { connect } from 'react-redux';
import SourceBox from './SourceBox';
import SourcePicker from './SourcePicker';

class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderSources() {
    const { sources } = this.props;
    return sources.map(source => (
      <SourceBox
        key={source.id}
        source={source}
      />
    ));
  }

  get displayPicker() {
    const { user } = this.props;
    return !user || !user.sources || user.sources.length !== 5
  }

  render() {
    return (
      <div>
        {!this.displayPicker && this.renderSources()}
        {this.displayPicker && <SourcePicker />}
      </div>
    );
  }
}

function mapStateToProps({ sources, user }) {
  return { sources, user };
}

export default connect(mapStateToProps)(Dashboard);
