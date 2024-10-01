import React, { useEffect, useState } from "react";
import "./Homepage.css";
import logos from "../../Utils/images/Food.png";
import Topics from "../../Component/Topics";
import View from "../../Component/View.jsx";
import SignUp from "../SignUp/SignUp.jsx"; // Import SignUp modal
import foodImg from "../../Utils/images/view.png"; // Import food image

const jsonData = [
  {
    "img": foodImg,
    "heading": "Topic 1",
    "description": "This is a brief description about Topic 1."
  },
  {
    "img": foodImg,
    "heading": "Topic 2",
    "description": "This is a brief description about Topic 2."
  },
  {
    "img": foodImg,
    "heading": "Topic 3",
    "description": "This is a brief description about Topic 3."
  },
  {
    "img": foodImg,
    "heading": "Topic 4",
    "description": "This is a brief description about Topic 4."
  },
  {
    "img": foodImg,
    "heading": "Topic 5",
    "description": "This is a brief description about Topic 5."
  },
  {
    "img": foodImg,
    "heading": "Topic 6",
    "description": "This is a brief description about Topic 6."
  },
  {
    "img": foodImg,
    "heading": "Topic 7",
    "description": "This is a brief description about Topic 7."
  },
  {
    "img": foodImg,
    "heading": "Topic 8",
    "description": "This is a brief description about Topic 8."
  }
];

const Homepage = () => {
  const [topic, setTopic] = useState([]);
  const [modal, setModal] = useState(false);
  const [formType, setFormType] = useState(""); // 'register' or 'login'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const StoryTopic = {
    All: logos,
    Medical: logos,
    Fruits: logos,
    World: logos,
    India: logos,
    Cricket: logos,
  };

  const handleOpenModal = (type) => {
    setFormType(type); // Set form type to 'register' or 'login'
    setModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setModal(false); // Close modal
  };

  useEffect(() => {
    setTopic(Object.entries(StoryTopic)); // Convert object to array of [key, value] pairs
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true); // Set login status based on localStorage
    }
  }, []);

  return (
    <div className={`homepage ${modal ? "blur-background" : ""}`}>
      {" "}
      {/* Apply blur when modal is open */}
      <header className="header-section">
        {isLoggedIn ? (
          <>
            <button type="button" className="add-story-btn">
              Add Story
            </button>
            <button type="button" className="bookmarks-btn">
              Bookmarks
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => handleOpenModal("register")}
              className="register-btn"
            >
              Register Now
            </button>
            <button
              type="button"
              onClick={() => handleOpenModal("login")}
              className="signin-btn"
            >
              Sign In
            </button>
          </>
        )}
      </header>
      
      {/* Topics Section */}
      <div className="topics-section">
        {topic.map(([key, value], index) => (
          <Topics key={index} image={value} topic={key} />
        ))}
      </div>

      {/* Top Stories Section */}
      <div className="stories-section">
        <h1>Top Stories</h1>
        <div className="stories-grid">
          {jsonData.map((item, index) => (
            <View
              key={index}
              image={item.img}
              heading={item.heading}
              desc={item.description}
            />
          ))}
        </div>
      </div>

      {modal && (
        <div className="modal-overlay">
          <SignUp handleClose={handleCloseModal} formType={formType} />
        </div>
      )}
    </div>
  );
};

export default Homepage;
