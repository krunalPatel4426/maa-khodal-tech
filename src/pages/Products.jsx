// Products.jsx (Updated)
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSpring, animated } from '@react-spring/web';

gsap.registerPlugin(ScrollTrigger);

function Products() {
  const [springProps, setSpringProps] = useSpring(() => ({
    scale: 1,
    config: { tension: 300, friction: 10 },
  }));

  useEffect(() => {
    gsap.from('.product-category', {
      y: 50,
      opacity: 1, // Fixed from 1 to 0 for fade-in effect
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.products-grid',
        start: 'top center',
      },
    });
  }, []);

  const productCategories = [
    {
      title: 'CNC Motor Components',
      description: 'High-precision motor parts including rotors, stators, and shaft assemblies',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
      items: ['Splinder Motors', 'Servo Motors', 'Stepper Motors', 'Linear Motors'],
      link: 'Motors & Drives'
    },
    {
      title: 'Industrial Tools',
      description: 'Professional-grade tools for CNC machinery and motor maintenance',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80',
      items: ['Cutting Tools', 'Measurement Tools', 'Maintenance Kits'],
      link: 'Cutting Tools'
    },
    {
      title: 'Custom Solutions',
      description: 'Tailored engineering solutions for specific industrial applications',
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64926?auto=format&fit=crop&q=80',
      items: ['Custom Motors', 'Specialized Components', 'Integration Systems'],
      link: 'Spindle Components'
    },
    {
      title: 'Automation Components',
      description: 'Components for automated manufacturing systems',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80',
      items: ['Control Systems', 'Sensors', 'Actuators'],
      link: 'Controllers & Electronics'
    },
  ];

  return (
    <>
      <Helmet>
        <title>Products - MK Enterprise</title>
        <meta name="description" content="Explore our range of CNC motor parts, industrial tools, and custom engineering solutions." />
      </Helmet>

      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl max-w-2xl">
            Discover our comprehensive range of precision-engineered components and industrial solutions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="products-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {productCategories.map((category, index) => (
              <animated.div
                key={index}
                className="product-category bg-white rounded-lg shadow-lg overflow-hidden"
                onMouseEnter={() => setSpringProps({ scale: 1.02 })}
                onMouseLeave={() => setSpringProps({ scale: 1 })}
                style={springProps}
              >
                <img src={category.image} alt={category.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <ul className="space-y-2 mb-6">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/product-list/${encodeURIComponent(category.link)}`}
                    className="btn-primary inline-block"
                  >
                    Browse Products
                  </Link>
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Custom Solutions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our engineering team can develop custom solutions tailored to your specific requirements.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Contact Our Team
          </Link>
        </div>
      </section>
    </>
  );
}

export default Products;