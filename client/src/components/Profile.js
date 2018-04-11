import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import StoryBox from './StoryBox';

class Profile extends Component {
  onRemoveStory(title) {
    if (window.confirm('You may lose this story forever. Are you sure you want to continue?')) {
      this.props.removeUserStory(title);
    }
  }

  renderStories() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    if (user.stories.length === 0) {
      return (
        <h4 className="page-title">You currently have no news stories saved</h4>
      );
    }

    return user.stories.map(story => (
      <StoryBox
        key={story.title}
        story={story}
        onStar={() => {}}
        onUnstar={() => this.onRemoveStory(story.title)}
        isStarred
      />
    ));
  }

  render() {
    return (
      <div>
        <h1 className="page-title">Your Stories</h1>
        {this.renderStories()}
        <div className="column-box">
          <a href="/home">Back</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, actions)(Profile);
