// ForgotPassword.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { Helmet } from 'react-helmet-async';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSpring, animated } from '@react-spring/web';
import { FaEnvelope } from 'react-icons/fa';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

function ForgotPassword() {
  const navigate = useNavigate(); // Added for redirection
  const [error, setError] = useState('');

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(''); // Clear previous errors
    try {
      const api = import.meta.env.VITE_API_URL;
      const response = await fetch(`${api}forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: values.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send reset link');
      }

      const data = await response.json();
      console.log('Password reset email sent:', data);
      navigate('/reset-password-sent'); // Redirect to new page on success
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password - MK Enterprise</title>
        <meta name="description" content="Reset your MK Enterprise account password" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <animated.div
          style={formAnimation}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg"
        >
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email to reset your password
            </p>
          </div>

          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {isSubmitting ? (
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Back to login
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </animated.div>
      </div>
    </>
  );
}

export default ForgotPassword;