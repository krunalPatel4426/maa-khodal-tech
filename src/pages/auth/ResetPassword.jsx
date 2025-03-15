// ResetPassword.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Changed useSearchParams to useParams
import { Helmet } from 'react-helmet-async';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSpring, animated } from '@react-spring/web';
import { FaLock } from 'react-icons/fa';

const resetPasswordSchema = Yup.object().shape({
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

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL path (e.g., /reset-password/:token)
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
      const response = await fetch(`${api}reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          newPassword: values.password, // Send new password in body
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reset password');
      }

      const data = await response.json();
      console.log('Password reset successful:', data);
      navigate('/login', { replace: true }); // Redirect to login on success
    } catch (err) {
      setError(err.message || 'An error occurred while resetting your password');
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-500">Invalid or expired reset link</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reset Password - MK Enterprise</title>
        <meta name="description" content="Reset your MK Enterprise account password" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <animated.div
          style={formAnimation}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg"
        >
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your new password
            </p>
          </div>

          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="mt-8 space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="sr-only">
                      New Password
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
                        placeholder="New Password"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="sr-only">
                      Confirm New Password
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
                        placeholder="Confirm New Password"
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
                      'Reset Password'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </animated.div>
      </div>
    </>
  );
}

export default ResetPassword;