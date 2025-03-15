import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSpring, animated } from '@react-spring/web';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const loginSchema = Yup.object().shape({
  identifier: Yup.string()
    .required('Email or Username is required'),
  password: Yup.string()
    .required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
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
      const response = await fetch(`${api}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: values.identifier, // Same value as identifier
          email: values.identifier,    // Same value as identifier
          password: values.password,
        }),
      });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Login failed');
      // }

      const data = await response.json();
      console.log(data);
      if(data.status === 404){
        throw new Error("User not found.")
      }

      if(data.status === 401){
        throw new Error("Invalid Credentials.")
      }

      localStorage.setItem('user', JSON.stringify(data.data));
      // console.log('Login successful:', data);
      window.location.href = "/";
      // navigate('/'); // Redirect to home on success
    } catch (err) {
      setError(err.message || 'Invalid email/username or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - MK Enterprise</title>
        <meta name="description" content="Login to your MK Enterprise account" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <animated.div
          style={formAnimation}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg"
        >
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to your account
            </p>
          </div>

          <Formik
            initialValues={{
              identifier: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Identifier Field (Email or Username) */}
                  <div>
                    <label htmlFor="identifier" className="sr-only">
                      Email or Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="identifier"
                        name="identifier"
                        type="text"
                        autoComplete="email username"
                        className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Email or Username"
                      />
                    </div>
                    <ErrorMessage
                      name="identifier"
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
                        autoComplete="current-password"
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
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-primary hover:text-primary/80"
                    >
                      Forgot your password?
                    </Link>
                  </div>
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
                      'Sign in'
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                      to="/signup"
                      className="font-medium text-primary hover:text-primary/80"
                    >
                      Sign up
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

export default Login;