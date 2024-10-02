import React, { useState } from 'react';
import './View.css';
import StoryModal from './StoryModal'; // Import the StoryModal component

const View = ({ image, heading, desc, stories }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialStoryIndex, setInitialStoryIndex] = useState(0); // To track which story to show initially

    const openModal = (index) => {
        setInitialStoryIndex(index); // Set the index of the story to open
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Card */}
            <div className="card" onClick={() => openModal(0)}>
                <div className='card-upper-shadow'></div>
                <img
                    className="card-image"
                    src={image} // Image URL
                    alt={heading}
                />
                <div className="card-content">
                    <h2 className="heading">{heading}</h2>
                    <h4 className="description">{desc}</h4>
                </div>
            </div>

            {/* Story Modal */}
            {isModalOpen && (
                <StoryModal
                    stories={stories} // Pass the stories array as props
                    initialStoryIndex={initialStoryIndex} // Set initial story index
                    onClose={closeModal} // Pass the function to close modal
                />
            )}
        </>
    );
};

export default View;
