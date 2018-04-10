import _ from 'lodash';
import md5 from 'md5';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import StoryBox from './StoryBox';

class Source extends Component {
  componentDidMount() {
		const { match, stories, fetchStories } = this.props;
    const { id } = match.params;
    const shouldLoadStories = (stories && stories.length === 0) ||
      _.get(stories, '[0].source.id') !== id;

		if (shouldLoadStories) {
      fetchStories(id);
		}

    window.scrollTo(0, 0);
	}

  get sourceName() {
    const { match, sources } = this.props;
    const { id } = match.params;
    const currentSource = sources.find(source => {
      return source.id === id;
    });

    return _.get(currentSource, 'name');
  }

  renderStories() {
    const { user, stories, addUserStory } = this.props;

    return stories.map(story => (
      <StoryBox
        key={story.publishedAt}
        story={story}
        onStar={() => addUserStory(story)}
        isStarred={user.stories.includes(md5(story.publishedAt))}
      />
    ));
  }

  render() {
    return (
      <div>
        {this.sourceName && <h1 className="source-name">{`Top Stories From ${this.sourceName}`}</h1>}
        {this.renderStories()}
        <div className="column-box">
          <a href="/home">Back</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ sources, stories, user }) {
  return { sources, stories, user };
}

export default connect(mapStateToProps, actions)(Source);
