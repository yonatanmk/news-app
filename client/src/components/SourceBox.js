import React from 'react';

const SourceBox = ({source, onClick}) => (
  <div className="source-box" onClick={() => onClick()}>
    <h2>{source.name}</h2>
    <p>{source.description}</p>
  </div>
)

export default SourceBox;
