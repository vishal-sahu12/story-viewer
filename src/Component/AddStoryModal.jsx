import React, { useEffect, useState } from 'react';
import './AddStoryModal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStoryModal = ({ handleClose }) => {
  const [slides, setSlides] = useState([
    { heading: '', description: '', image: '', category: '' },
    { heading: '', description: '', image: '', category: '' },
    { heading: '', description: '', image: '', category: '' },
  ]); // Default 3 slides
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); // For loader

  // Fetch categories from the API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://192.168.66.242:3000/api/stories/categories'); // Replace with your API endpoint
        const categoriesData = await response.json();

        setCategories(categoriesData);

        // Map categories by name and store in localStorage
        const categoryMap = {};
        categoriesData.forEach(category => {
          categoryMap[category.name] = category._id;
        });

        localStorage.setItem('categories', JSON.stringify(categoryMap));
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e, index, field) => {
    const updatedSlides = [...slides];
    updatedSlides[index][field] = e.target.value;
    setSlides(updatedSlides);
  };

  const addSlide = () => {
    if (slides.length < 6) {
      setSlides([...slides, { heading: '', description: '', image: '', category: '' }]);
    }
  };

  const removeSlide = (index) => {
    if (slides.length > 3) {
      const updatedSlides = slides.filter((_, i) => i !== index);
      setSlides(updatedSlides);
      if (currentSlide >= updatedSlides.length) setCurrentSlide(updatedSlides.length - 1); // Ensure valid index
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handlePostStory = async () => {
    const story = slides[currentSlide];

    const selectedCategory = categories.find(cat => cat.name === story.category);

    if (!selectedCategory) {
      toast.error('Please select a valid category.');
      return;
    }

    const storyData = {
      imageUrl: story.image,
      heading: story.heading,
      text: story.description,
      categoryId: selectedCategory._id,
    };

    const token = localStorage.getItem('token')?.replace(/"/g, '').trim(); // Remove double quotes and trim spaces
    console.log(token)

    setLoading(true); // Start loader

    try {
      const response = await fetch('http://192.168.66.242:3000/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify(storyData),
      });

      if (response.ok) {
        toast.success('Story posted successfully!');
        handleClose(); // Close the modal
      } else {
        const errorData = await response.json();
        toast.error(`Error posting story: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Failed to post story:', error);
      toast.error('Failed to post story.');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="modal">
      <ToastContainer />
      {loading && <div className="loader">Posting...</div>} {/* Loader */}
      <div className={`modal-content ${loading ? 'disabled' : ''}`}>
        <div className="modal-header">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`tab-button ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              disabled={loading} // Disable buttons during loading
            >
              Slide {index + 1}
              {index >= 3 && slides.length > 3 && (
                <span className="delete-btn" onClick={() => removeSlide(index)}>✖</span>
              )}
            </button>
          ))}
          {slides.length < 6 && (
            <button className="add-slide-btn" onClick={addSlide} disabled={loading}>
              Add +
            </button>
          )}
          <button className="close-btn" onClick={handleClose} disabled={loading}>✖</button> {/* Close modal */}
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Heading:</label>
            <input
              type="text"
              value={slides[currentSlide].heading}
              onChange={(e) => handleInputChange(e, currentSlide, 'heading')}
              placeholder="Your heading"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={slides[currentSlide].description}
              onChange={(e) => handleInputChange(e, currentSlide, 'description')}
              placeholder="Story Description"
              disabled={loading}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Image:</label>
            <input
              type="text"
              value={slides[currentSlide].image}
              onChange={(e) => handleInputChange(e, currentSlide, 'image')}
              placeholder="Add Image URL"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              value={slides[currentSlide].category}
              onChange={(e) => handleInputChange(e, currentSlide, 'category')}
              disabled={loading}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="prev-btn" onClick={handlePreviousSlide} disabled={currentSlide === 0 || loading}>
            Previous
          </button>
          <button className="next-btn" onClick={handleNextSlide} disabled={currentSlide === slides.length - 1 || loading}>
            Next
          </button>
          <button className="post-btn" onClick={handlePostStory} disabled={loading}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStoryModal;
