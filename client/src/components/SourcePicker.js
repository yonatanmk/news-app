import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SourcePicker extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      sources: [],
    };
  }

  handleCheckboxChange(event) {
    const { sources } = this.state;
    const sourceId = event.target.name;
    if (sources.includes(sourceId)) {
      this.setState({
        sources: sources.filter(source => source !== sourceId)
      })
    } else {
      this.setState({
        sources: [...sources, sourceId]
      })
    }
  }

  isChecked(source) {
    return this.state.sources.includes(source.id);
  }

  onSubmit(e) {
    e.preventDefault()
    const { sources } = this.state;
    if (sources.length === 5) {
      this.props.setUserSources(sources);
    } else {
      alert("You must pick 5 news sources. No more, no less.")
    }
  }

  renderSources() {
    const { sources } = this.props;
    return sources.map(source => (
      <div key={source.id}>
        <input
          name={source.id}
          type="checkbox"
          checked={this.isChecked(source)}
          onChange={e => this.handleCheckboxChange(e)}
        />
        <label>{source.name}</label>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <h1>Please Choose 5 News Sources</h1>
        <form onSubmit={e => this.onSubmit(e)}>
          {this.renderSources()}
          <input name="submit" type="submit" />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ sources }) {
  return { sources };
}

export default connect(mapStateToProps, actions)(SourcePicker);
