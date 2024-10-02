import React, { useState } from "react";
import "./StoryModal.css"; // Include your CSS file for styling

const StoryModal = ({ stories, initialStoryIndex, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const currentStory = stories[currentStoryIndex];

  return (
    <div className="story-modal">
      <div className="story-header">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="progress-bar">
          {stories.map((story, index) => (
            <div
              key={index}
              className={`progress-segment ${
                index <= currentStoryIndex ? "filled" : ""
              }`}
            ></div>
          ))}
        </div>
        <button className="share-button">Share</button>
      </div>

      {/* Carousel Wrapper */}
      <div className="story-carousel">
        <div
          className="story-slide"
          style={{ transform: `translateX(-${currentStoryIndex * 100}%)` }}
        >
          {stories.map((story, index) => (
            <div key={index} className="story-content">
              <img src={story.img} alt={story.heading} />
              <div className="story-text">
                <h2>{story.heading}</h2>
                <p>{story.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="story-footer">
        <button className="bookmark-button">🔖</button>
        <button className="like-button">❤️ {currentStory.likes}</button>
      </div>

      <div className="story-navigation">
        <button
          className="prev-button"
          onClick={handlePrevStory}
          disabled={currentStoryIndex === 0}
        >
          ◀
        </button>
        <button
          className="next-button"
          onClick={handleNextStory}
          disabled={currentStoryIndex === stories.length - 1}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
