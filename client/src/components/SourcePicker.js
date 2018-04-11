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

  onSourceClick(source) {
    const event = {
      target: {
        name: source.id,
      }
    }
    this.handleCheckboxChange(event)
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
      <div key={source.id} className="source-list-item col" onClick={() => this.onSourceClick(source)}>
        <input
          name={source.id}
          type="checkbox"
          checked={this.isChecked(source)}
          onChange={e => this.handleCheckboxChange(e)}
        />
        <label className="source-label">{source.name}</label>
      </div>
    ));
  }

  get submitDisabled() {
    return this.state.sources.length !== 5;
  }

  render() {
    return (
      <div className="source-list">
        <h1 className="page-title">Please Choose 5 News Sources</h1>
        <form onSubmit={e => this.onSubmit(e)}>
          <div className="flex-grid">
            {this.renderSources()}
          </div>
          <div className="flex">
            <input
              className={`submit ${this.submitDisabled ? 'submit-disabled' : 'submit-active'}`}
              name="submit"
              type="submit"
              value={this.submitDisabled ? 'Please select 5 news sources' : "Submit"}
              disabled={this.submitDisabled} />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ sources }) {
  return { sources };
}

export default connect(mapStateToProps, actions)(SourcePicker);
