import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSpring, animated } from '@react-spring/web';
import gsap from 'gsap';

function Home() {
  const heroRef = useRef(null);
  const taglineRef = useRef(null);

  const [cardSpring, setCardSpring] = useSpring(() => ({
    scale: 1,
    config: { tension: 300, friction: 10 }
  }));

  useEffect(() => {
    // GSAP animations
    gsap.from(taglineRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.5
    });

    gsap.from('.feature-card', {
      y: 50,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.features-section',
        start: 'top center'
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>MK Enterprise - Precision Engineering Solutions</title>
        <meta name="description" content="Leading provider of CNC motor parts and precision engineering solutions. Quality products and expert services for all your industrial needs." />
        <meta name="keywords" content="CNC motor parts, precision engineering, industrial solutions, MK Enterprise" />
      </Helmet>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80")' }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 ref={taglineRef} className="text-4xl md:text-6xl font-bold text-white mb-6">
              Precision Engineering for Your Needs
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Delivering excellence in CNC motor parts and industrial solutions
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="btn-primary">
                Explore Products
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="features-section section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'CNC Motor Components',
                image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
                description: 'High-precision motor parts engineered for optimal performance'
              },
              {
                title: 'Industrial Tools',
                image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80',
                description: 'Professional-grade tools for industrial applications'
              },
              {
                title: 'Custom Solutions',
                image: '/img2/router1.jpeg',
                description: 'Tailored engineering solutions for your specific needs'
              }
            ].map((product, index) => (
              <animated.div
                key={index}
                className="feature-card bg-white rounded-lg shadow-lg overflow-hidden"
                onMouseEnter={() => setCardSpring({ scale: 1.05 })}
                onMouseLeave={() => setCardSpring({ scale: 1 })}
                style={cardSpring}
              >
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'CNC Machining',
                description: 'Precision machining services with state-of-the-art equipment'
              },
              {
                title: 'Motor Repair',
                description: 'Expert repair and maintenance for industrial motors'
              },
              {
                title: 'Custom Fabrication',
                description: 'Tailored solutions for unique industrial requirements'
              }
            ].map((service, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;