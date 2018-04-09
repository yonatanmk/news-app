import React from 'react';
import { Link } from "react-router-dom";

const SourceBox = ({source}) => (
  <Link to="/source/tsting">
    <div className="source-box">
      <h2>{source.name}</h2>
      <p>{source.description}</p>
    </div>
  </Link>
)

export default SourceBox;
