import React, { useEffect, useState } from "react";
import "./Homepage.css";
import logos from "../../Utils/images/Food.png";
import Topics from "../../Component/Topics";
import View from "../../Component/View.jsx";
import SignUp from "../SignUp/SignUp.jsx"; // Import SignUp modal
import foodImg from "../../Utils/images/view.png"; // Import food image
import StoryModal from "../../Component/StoryModal.jsx"; // Import StoryModal
import AddStoryModal from "../../Component/AddStoryModal.jsx";

const jsonData = [
  {
    img: foodImg,
    heading: "Topic 1",
    description: "This is a brief description about Topic 1.",
    likes: 1000,
  },
  {
    img: foodImg,
    heading: "Topic 2",
    description: "This is a brief description about Topic 2.",
    likes: 1001,
  },
  {
    img: foodImg,
    heading: "Topic 3",
    description: "This is a brief description about Topic 3.",
    likes: 1020,
  },
  {
    img: foodImg,
    heading: "Topic 4",
    description: "This is a brief description about Topic 4.",
    likes: 102,
  },
  {
    img: foodImg,
    heading: "Topic 5",
    description: "This is a brief description about Topic 5.",
    likes: 1023,
  },
  {
    img: foodImg,
    heading: "Topic 6",
    description: "This is a brief description about Topic 6.",
    likes: 1100,
  },
  {
    img: foodImg,
    heading: "Topic 7",
    description: "This is a brief description about Topic 7.",
    likes: 1060,
  },
  {
    img: foodImg,
    heading: "Topic 8",
    description: "This is a brief description about Topic 8.",
    likes: 11,
  },
];

const Homepage = () => {
  const [topic, setTopic] = useState([]);
  const [modal, setModal] = useState(false);
  const [formType, setFormType] = useState(""); // 'register' or 'login'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addStoryModalVisible,setAddStoryModalVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4); // Display 4 cards initially

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false); // State for story modal
  const [initialStoryIndex, setInitialStoryIndex] = useState(0); // Index for story to be displayed

  const StoryTopic = {
    All: logos,
    Medical: logos,
    Fruits: logos,
    World: logos,
    India: logos,
    Cricket: logos,
  };

  const handleAddStory =()=>{
    setAddStoryModalVisible(true);
  }

  const handleAddStoryModalClose =()=>{
    setAddStoryModalVisible(false);
  }

  const handleOpenModal = (type) => {
    setFormType(type);
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleSeeMore = () => {
    setVisibleItems(jsonData.length); // Show all items
  };

  const handleOpenStoryModal = () => {
    setInitialStoryIndex(0); // Start from the first story
    setIsStoryModalOpen(true); // Open story modal
  };

  const handleCloseStoryModal = () => {
    setIsStoryModalOpen(false); // Close story modal
  };

  useEffect(() => {
    setTopic(Object.entries(StoryTopic)); // Convert object to array of [key, value] pairs
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className={`homepage ${modal ? "blur-background" : ""}`}>
      {" "}
      {/* Apply blur when modal is open */}
      <header className="header-section">
        {isLoggedIn ? (
          <>
            <button type="button" className="add-story-btn" onClick={handleAddStory}>
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
          {jsonData.slice(0, visibleItems).map((item, index) => (
            <View

              stories={jsonData}
              key={index}
              image={item.img}
              heading={item.heading}
              desc={item.description}
            />
          ))}
        </div>

        {/* Conditionally render "See More" button */}
        {visibleItems < jsonData.length && (
          <button className="see-more-btn" onClick={handleSeeMore}>
            See More
          </button>
        )}
      </div>

      {/* Stories Section for Modal */}
      <div className="stories-section-food">
        <h1>Top Stories For Modal</h1>
        <button className="open-story-modal-btn" onClick={handleOpenStoryModal}>
          View Stories
        </button>

        
      </div>

      {/* StoryModal - Show if isStoryModalOpen is true */}
      {isStoryModalOpen && (
        <StoryModal
          stories={jsonData}
          initialStoryIndex={initialStoryIndex}
          onClose={handleCloseStoryModal}
        />
      )}

      {/* SignUp Modal */}
      {modal && (
        <div className="modal-overlay">
          <SignUp handleClose={handleCloseModal} formType={formType} />
        </div>
      )}


      {
        addStoryModalVisible &&(
          <div className="modal-overlay">
            <AddStoryModal handleClose={handleAddStoryModalClose} />
          </div>
        )
      }
    </div>
  );
};

export default Homepage;
