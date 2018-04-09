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

  get sourceName() {
    const { match, sources } = this.props;
    const { id } = match.params;
    const currentSource = sources.find(source => {
      return source.id === id;
    })

    return _.get(currentSource, 'name');
  }

  renderStories() {
    const { stories } = this.props;
    return stories.map(story => (
      <div className="source-box source-box-wrapper" key={story.title + story.description}>
        <h2>{story.title}</h2>
        {story.urlToImage && <img src={story.urlToImage} alt='Unavailable' width="400" />}
        <p>{story.description} <a href={story.url}>Read More</a></p>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <h1 className={"source-name"}>{`Top Stories From ${this.sourceName}`}</h1>
        {this.renderStories()}
      </div>
    );
  }
}

function mapStateToProps({ sources, stories }) {
  return { sources, stories };
}

export default connect(mapStateToProps, actions)(Source);
