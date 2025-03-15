import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { HiMenu, HiX } from 'react-icons/hi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuAnimation = useSpring({
    transform: isOpen ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: isOpen ? 1 : 0,
  });

  return (
    <nav className="bg-primary text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            MK Enterprise
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <Link to="/about" className="hover:text-secondary transition-colors">About Us</Link>
            <Link to="/products" className="hover:text-secondary transition-colors">Products</Link>
            <Link to="/services" className="hover:text-secondary transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
            <Link to="/login" className="hover:text-secondary transition-colors">Login</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <animated.div
          style={menuAnimation}
          className="md:hidden absolute top-16 left-0 right-0 bg-primary"
        >
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <Link to="/about" className="hover:text-secondary transition-colors">About Us</Link>
            <Link to="/products" className="hover:text-secondary transition-colors">Products</Link>
            <Link to="/services" className="hover:text-secondary transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
            <Link to="/login" className="hover:text-secondary transition-colors">Login</Link>
          </div>
        </animated.div>
      </div>
    </nav>
  );
}

export default Navbar;