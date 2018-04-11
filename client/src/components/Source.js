import _ from 'lodash';
import md5 from 'md5';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    const { user, stories, addUserStory, removeUserStory } = this.props;

    if (!user) {
      return null;
    }

    return stories.map(story => (
      <StoryBox
        key={story.title}
        story={story}
        onStar={() => addUserStory(story)}
        onUnstar={() => removeUserStory(story.title)}
        isStarred={user.storyIds.includes(md5(story.title))}
      />
    ));
  }

  render() {
    return (
      <div>
        {this.sourceName && <h1 className="page-title">{`Top Stories From ${this.sourceName}`}</h1>}
        {this.renderStories()}
        <div className="column-box">
          <Link to="/home">Back</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ sources, stories, user }) {
  return { sources, stories, user };
}

export default connect(mapStateToProps, actions)(Source);
