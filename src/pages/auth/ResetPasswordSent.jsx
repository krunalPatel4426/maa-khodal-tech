// ResetPasswordSent.jsx
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { FaEnvelope } from 'react-icons/fa';

function ResetPasswordSent() {
  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  return (
    <>
      <Helmet>
        <title>Reset Password Sent - MK Enterprise</title>
        <meta name="description" content="A password reset link has been sent to your email." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <animated.div
          style={animation}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg text-center"
        >
          <div className="flex justify-center">
            <FaEnvelope className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Check Your Email</h2>
          <p className="mt-2 text-sm text-gray-600">
            If an account exists with the email you provided, a password reset link has been sent. Please check your inbox (and spam/junk folder) and follow the instructions to reset your password.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Return to Login
            </Link>
          </div>
        </animated.div>
      </div>
    </>
  );
}

export default ResetPasswordSent;