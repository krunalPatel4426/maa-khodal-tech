import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Services() {
  useEffect(() => {
    gsap.from('.service-card', {
      y: 50,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top center'
      }
    });

    gsap.from('.process-step', {
      x: -50,
      opacity: 1,
      duration: 0.8,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.process-section',
        start: 'top center'
      }
    });
  }, []);

  const services = [
    {
      title: 'CNC Machining',
      description: 'Precision machining services with state-of-the-art equipment for complex parts and components.',
      features: [
        'High-precision cutting',
        'Complex geometries',
        'Rapid prototyping',
        'Large volume production'
      ]
    },
    {
      title: 'Motor Repair & Maintenance',
      description: 'Expert repair and maintenance services for industrial motors and CNC equipment.',
      features: [
        'Preventive maintenance',
        'Emergency repairs',
        'Performance optimization',
        'Reliability testing'
      ]
    },
    {
      title: 'Custom Fabrication',
      description: 'Tailored solutions for unique industrial requirements and specialized applications.',
      features: [
        'Custom design',
        'Prototype development',
        'Material selection',
        'Quality assurance'
      ]
    },
    {
      title: 'Technical Consultation',
      description: 'Expert guidance for optimal solution selection and implementation.',
      features: [
        'Requirements analysis',
        'Solution design',
        'Implementation planning',
        'Technical support'
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Initial meeting to understand your requirements and objectives'
    },
    {
      step: '02',
      title: 'Analysis',
      description: 'Detailed analysis and solution design by our technical team'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Execution of the agreed solution with precision and care'
    },
    {
      step: '04',
      title: 'Quality Assurance',
      description: 'Rigorous testing and validation of the delivered solution'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services - MK Enterprise</title>
        <meta name="description" content="Professional CNC machining, motor repair, and custom fabrication services for industrial applications." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-2xl">
            End-to-end CNC solutions tailored to your industry needs, backed by decades of expertise.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      {/* <section className="process-section bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="text-4xl font-bold text-primary mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today to discuss your project requirements.
          </p>
          <Link to="/contact" className="btn-primary">
            Request Consultation
          </Link>
        </div>
      </section>
    </>
  );
}

export default Services;