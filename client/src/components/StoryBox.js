import React from 'react';
import { getStoryDate } from '../lib/story-utils';
import Star from 'react-icons/lib/fa/star';

const SourceBox = ({ story, isStarred, onStar }) => (
  <div className={`source-box source-box-wrapper story-box ${isStarred ? 'gold' : ''}`}>
    <h2>{story.title}</h2>
    {story.urlToImage && <img src={story.urlToImage} alt="Unavailable" width="500" />}
    <p>{getStoryDate(story)}</p>
    <p>{story.description} <a href={story.url}>Read More</a></p>
    <div className="star-button-wrapper">
      <a className={`star-button ${isStarred ? 'silver' : ''}`} onClick={() => onStar()}><Star /></a>
    </div>
  </div>
);

export default SourceBox;
