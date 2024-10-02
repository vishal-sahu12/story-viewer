import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import closeBtn from '../../Utils/extra/Vector.svg';

const SignUp = ({ handleClose, formType }) => {
  const type = formType === 'register' ? 'Register' : 'Login';

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters long')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const url = formType === 'register'
        ? 'http://192.168.66.242:3000/api/auth/signup'
        : 'http://192.168.66.242:3000/api/auth/login';

      const response = await axios.post(url, values);

      if (response.status === 201 && formType === 'register') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', JSON.stringify(response.data.token));
        toast.success('User registered successfully!');
        setTimeout(() => {
          handleClose();
          window.location.href = '/';  // Navigate to homepage
        }, 1500);
      } else if (response.status === 200 && formType === 'login') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', JSON.stringify(response.data.token));
        toast.success('Successfully logged in!');
        setTimeout(() => {
          handleClose();
          window.location.href = '/';  // Navigate to homepage
        }, 1500);
      }
    } catch (error) {
      setErrors({ apiError: 'An error occurred. Please try again.' });
      toast.error('Login/Signup failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-modal show">
      <div className="modal-content">
        <div className='close-btns' onClick={handleClose}>
          <img src={closeBtn} alt="close-btn" />
        </div>
        <h1>{type}</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className='modal-username'>
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Username"
                />
                
              </div>

              <div className='modal-password'>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                />
                
              </div>
              

              {errors.apiError && <div className="error">{errors.apiError}</div>}

              <button className="register-submit-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <div className="spinner"></div> : type}
              </button>

              {isSubmitting && <div className="loader">Loading...</div>}
            </Form>
          )}
        </Formik>
      </div>

      {/* Toastify container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default SignUp;
