import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SourceBox from './SourceBox';
import SourcePicker from './SourcePicker';

class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  get displayPicker() {
    const { user } = this.props;
    return !user || !user.sources || user.sources.length !== 5;
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

  render() {
    if (this.props.user === false) {
      return (<Redirect to="/" />);
    }
    return (
      <div>
        {!this.displayPicker && this.props.sources && this.renderSources()}
        {this.displayPicker && <SourcePicker />}
      </div>
    );
  }
}

function mapStateToProps({ sources, user }) {
  return { sources, user };
}

export default connect(mapStateToProps)(Dashboard);
