import React from 'react';
import { getStoryDate } from '../lib/story-utils';

const SourceBox = ({ story }) => (
  <div className="source-box source-box-wrapper story-box">
    <h2>{story.title}</h2>
    {story.urlToImage && <img src={story.urlToImage} alt="Unavailable" width="500" />}
    <p>{getStoryDate(story)}</p>
    <p>{story.description} <a href={story.url}>Read More</a></p>
  </div>
);

export default SourceBox;
