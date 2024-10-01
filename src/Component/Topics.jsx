import React from 'react';
import './Topics.css';

const Topics = (props) => {
  return (
    <div className="topic-container" style={{ backgroundImage: `url(${props.image})` }}>
      <div className="topic-overlay">
        <h2 className="topic-title">{props.topic}</h2>
      </div>
    </div>
  );
};

export default Topics;
