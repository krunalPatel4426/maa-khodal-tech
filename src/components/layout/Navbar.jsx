import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { HiMenu, HiX } from 'react-icons/hi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to check login status
  const checkLoginStatus = () => {
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(!!storedUser);
  };

  // Check login status on mount and listen for storage changes
  useEffect(() => {
    checkLoginStatus(); // Initial check

    // Listen for storage events (cross-tab updates)
    window.addEventListener('storage', checkLoginStatus);

    // Custom event for same-tab updates (triggered after login)
    window.addEventListener('authChange', checkLoginStatus);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('authChange', checkLoginStatus);
    };
  }, []);

  const menuAnimation = useSpring({
    transform: isOpen ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: isOpen ? 1 : 0,
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
    window.dispatchEvent(new Event('authChange')); // Trigger update
  };

  return (
    <nav className="bg-primary text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand, Logo, and Slogan */}
          <div className="flex sm:items-center sm:space-x-2 flex-col sm:flex-row items-start">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/img2/Maa Khodal Technology.png"
                alt="MK Technology Logo"
                className="h-8 w-8 sm:h-8 sm:w-8 bg-white rounded-xl"
              />
              <span className="text-xl sm:text-2xl font-bold">MK TECHNOLOGY</span>
            </Link>
            <span className="text-xs sm:text-sm font-light text-gray-200 md:text-left">
              Your Spindle, Our Responsibility
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-secondary transition-colors">
              About Us
            </Link>
            <Link to="/products" className="hover:text-secondary transition-colors">
              Products
            </Link>
            <Link to="/services" className="hover:text-secondary transition-colors">
              Services
            </Link>
            <Link to="/contact" className="hover:text-secondary transition-colors">
              Contact
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hover:text-secondary transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-secondary transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <animated.div
          style={menuAnimation}
          className="md:hidden absolute top-16 left-0 right-0 bg-primary"
        >
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-secondary transition-colors">
              About Us
            </Link>
            <Link to="/products" className="hover:text-secondary transition-colors">
              Products
            </Link>
            <Link to="/services" className="hover:text-secondary transition-colors">
              Services
            </Link>
            <Link to="/contact" className="hover:text-secondary transition-colors">
              Contact
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hover:text-secondary transition-colors text-left"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-secondary transition-colors">
                Login
              </Link>
            )}
            {/* Slogan in Mobile Menu */}
            <span className="text-sm font-light text-gray-200">
              Your Spindle, Our Responsibility
            </span>
          </div>
        </animated.div>
      </div>
    </nav>
  );
}

export default Navbar;