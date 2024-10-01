// import React, { useState } from 'react';
// import './Slides.css'
// function SlideModal() {
//   const [show, setShow] = useState(false);
//   const [heading, setHeading] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [category, setCategory] = useState('');


//   const handleClose = () => {
//     setShow(false);
//     setHeading('');
//     setDescription('');
//     setImage('');
//     setCategory('');
//     setSlides(initialState);
//   };

//   const handleAddSlide = () => {
//     const newSlide = {
//       id: slides.length + 1,
//       heading: '',
//       description: '',
//       image: '',
//       category: '',
//     };
//     setSlides([...slides, newSlide]);
//   };

//   const handlePrevious = () => {
//     // Implement logic to move to the previous slide
//   };

//   const handleNext = () => {
//     // Implement logic to move to the next slide
//   };

//   const handleSubmit = () => {
//     // Implement logic to submit the form data
//     console.log('Form data:', { heading, description, image, category, slides });
//     handleClose();
//   };

//   const initialState = [
//     { id: 1, heading: '', description: '', image: '', category: '' },
//     { id: 2, heading: '', description: '', image: '', category: '' },
//     { id: 3, heading: '', description: '', image: '', category: '' },
//     { id: 4, heading: '', description: '', image: '', category: '' },
//   ];

//   return (
//     <div>
//       <button onClick={() => setShow(true)}>Open Modal</button>
//       {show && (
//         <div className="modal">
//           <div className="modal-contents">
//             <span className="close" onClick={handleClose}>&times;</span>
//             <h2>Add up to 6 slides</h2>
//             <div className="slides-container">
//               {slides.map((slide) => (
//                 <div key={slide.id} className="slide">
//                   <input
//                     type="text"
//                     placeholder="Slide Heading"
//                     value={slide.heading}
//                     onChange={(e) => {
//                       const updatedSlides = slides.map((s) =>
//                         s.id === slide.id ? { ...s, heading: e.target.value } : s
//                       );
//                       setSlides(updatedSlides);
//                     }}
//                   />
//                   <textarea
//                     placeholder="Slide Description"
//                     value={slide.description}
//                     onChange={(e) => {
//                       const updatedSlides = slides.map((s) =>
//                         s.id === slide.id ? { ...s, description: e.target.value } : s
//                       );
//                       setSlides(updatedSlides);
//                     }}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Slide Image URL"
//                     value={slide.image}
//                     onChange={(e) => {
//                       const updatedSlides = slides.map((s) =>
//                         s.id === slide.id ? { ...s, image: e.target.value } : s
//                       );
//                       setSlides(updatedSlides);
//                     }}
//                   />
//                   <select
//                     value={slide.category}
//                     onChange={(e) => {
//                       const updatedSlides = slides.map((s) =>
//                         s.id === slide.id ? { ...s, category: e.target.value } : s
//                       );
//                       setSlides(updatedSlides);
//                     }}
//                   >
//                     <option value="">Select Category</option>
//                     {/* Add category options here */}
//                   </select>
//                 </div>
//               ))}
//             </div>
//             <button onClick={handleAddSlide}>Add Slide</button>
//             <button onClick={handlePrevious}>Previous</button>
//             <button onClick={handleNext}>Next</button>
//             <button onClick={handleSubmit}>Post</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SlideModal;