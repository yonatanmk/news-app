import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Source extends Component {

  componentDidMount() {
		const { match, stories, fetchStories } = this.props;
    const { id } = match.params;
    const shouldLoadStories = (stories && stories.length === 0) ||
      _.get(stories, '[0].source.id') !== id;

		if (shouldLoadStories) {
    	fetchStories(id);
		}
	}

  renderStories() {
    const { stories } = this.props;
    return stories.map(story => (
      <div key={story.title + story.description}>
        <h2>{story.title}</h2>
      </div>
    ));
  }

  render() {
    return (
      <div>
        {this.renderStories()}
      </div>
    );
  }
}

function mapStateToProps({ stories }) {
  return { stories };
}

export default connect(mapStateToProps, actions)(Source);
