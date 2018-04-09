import React from 'react';
import { Link } from 'react-router-dom';

const SourceBox = ({ source }) => (
  <div className="source-box-wrapper">
    <Link className="source-box-link" to={`/source/${source.id}`}>
      <div className="source-box">
        <h2>{source.name}</h2>
        <p>{source.description}</p>
      </div>
    </Link>
  </div>
);

export default SourceBox;
