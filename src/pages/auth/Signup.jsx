import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSpring, animated } from '@react-spring/web';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(''); // Clear any previous errors
    try {
      const api = import.meta.env.VITE_API_URL;
      const response = await fetch(`${api}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      if(data.status === 409){
        throw new Error("Username already in use.");
      }
      if(data.status === 410){
        throw new Error("Email is already in use.")
      }
      // console.log('Signup successful:', data);
      navigate('/verify-email'); // Redirect to login on success
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - MK Enterprise</title>
        <meta name="description" content="Create your MK Enterprise account" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <animated.div
          style={formAnimation}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg"
        >
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Create an Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join MK Enterprise today
            </p>
          </div>

          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, errors, touched }) => (
              <Form className="mt-8 space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Username Field */}
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Username"
                      />
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* Email Field */}
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

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Password"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="sr-only">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Password must contain:</p>
                  <ul className="text-sm space-y-1">
                    <li className={`flex items-center ${values.password?.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
                      <span className="mr-2">{values.password?.length >= 8 ? '✓' : '×'}</span>
                      At least 8 characters
                    </li>
                    <li className={`flex items-center ${/[A-Z]/.test(values.password || '') ? 'text-green-500' : 'text-red-500'}`}>
                      <span className="mr-2">{/[A-Z]/.test(values.password || '') ? '✓' : '×'}</span>
                      One uppercase letter
                    </li>
                    <li className={`flex items-center ${/[a-z]/.test(values.password || '') ? 'text-green-500' : 'text-red-500'}`}>
                      <span className="mr-2">{/[a-z]/.test(values.password || '') ? '✓' : '×'}</span>
                      One lowercase letter
                    </li>
                    <li className={`flex items-center ${/[0-9]/.test(values.password || '') ? 'text-green-500' : 'text-red-500'}`}>
                      <span className="mr-2">{/[0-9]/.test(values.password || '') ? '✓' : '×'}</span>
                      One number
                    </li>
                    <li className={`flex items-center ${/[^A-Za-z0-9]/.test(values.password || '') ? 'text-green-500' : 'text-red-500'}`}>
                      <span className="mr-2">{/[^A-Za-z0-9]/.test(values.password || '') ? '✓' : '×'}</span>
                      One special character
                    </li>
                  </ul>
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
                      'Sign up'
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-medium text-primary hover:text-primary/80"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </animated.div>
      </div>
    </>
  );
}

export default Signup;