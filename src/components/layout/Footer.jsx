import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  useEffect(() => {
    gsap.fromTo(
      '.footer-content',
      { y: 50, opacity: 0 }, // From
      {
        y: 0,
        opacity: 1, // To
        duration: 1,
        // scrollTrigger: {
        //   trigger: '.footer-content',
        //   start: 'top bottom',
        //   toggleActions: 'play none none reverse',
        // },
      }
    );
  }, []);

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MK TECHNOLOGY</h3>
            <p className="text-sm">
              Leading provider of CNC motor parts and precision engineering solutions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-secondary transition-colors">Products</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <p className="text-sm mb-2">Email: info@mktechnology.com</p>
            <p className="text-sm mb-4">Phone: +91 9429409423</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors"><FaTwitter size={20} /></a>
              {/* <a href="#" className="hover:text-secondary transition-colors"><FaLinkedin size={20} /></a> */}
              <a href="https://www.instagram.com/ayushdobariya8?igsh=dG5sb2NqZTl1OTZo" className="hover:text-secondary transition-colors"><FaInstagram size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-4 text-center">
          <p className="text-sm">© 2025 MK TECHNOLOGY. All rights reserved.</p>
        </div>

        {/* Developer Credit Section */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Designed and Developed by Krunal Shiyaniya
          </p>
          <div className="flex justify-center space-x-4 mt-2">

            <a
              href="https://www.linkedin.com/in/shiyaniya-krunal-0b9a482b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com/krunalPatel4426"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.instagram.com/patel_krunal_4426/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;