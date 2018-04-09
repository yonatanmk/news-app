import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Source extends Component {

  componentDidMount() {
		const { match, stories, fetchStories } = this.props;
    const { id } = match.params;
    // console.log(stories)
    // const shouldLoadStories = stories && stories.length === 0 && stories[0].source.id === id;
		if (stories && stories.length === 0) {
    	fetchStories(id);
		}
	}

  // renderSources() {
  //   const { sources } = this.props;
  //   return sources.map(source => (
  //     <SourceBox
  //       key={source.id}
  //       source={source}
  //       onClick={() => console.log(source.name)}
  //     />
  //   ));
  // }

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
