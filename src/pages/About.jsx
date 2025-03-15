import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const timelineRef = useRef(null);

  useEffect(() => {
    gsap.from('.about-header', {
      y: -50,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: '.about-header',
        start: 'top center'
      }
    });

    gsap.from('.timeline-item', {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top center'
      }
    });

    gsap.from('.team-member', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.team-section',
        start: 'top center'
      }
    });
  }, []);

  const milestones = [
    { year: '2010', event: 'Founded MK Enterprise' },
    { year: '2015', event: 'Expanded to CNC Manufacturing' },
    { year: '2018', event: 'ISO 9001:2015 Certification' },
    { year: '2020', event: 'Launched Custom Solutions Division' },
    { year: '2023', event: 'Global Market Expansion' }
  ];

  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Engineering',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'Technical Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - MK Enterprise</title>
        <meta name="description" content="Learn about MK Enterprise's journey in precision engineering and CNC motor solutions since 2010." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="about-header bg-primary text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MK Enterprise</h1>
            <p className="text-xl max-w-2xl">
              Leading the way in precision engineering and CNC motor solutions.
              Our commitment to excellence drives innovation in industrial manufacturing.
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Our Story</h2>
              <p className="text-gray-700 mb-6">
                MK Enterprise is a leader in CNC motor solutions, delivering top-tier services
                and parts. Our team specializes in precision engineering, combining
                decades of expertise with cutting-edge technology to deliver exceptional results.
              </p>
              <p className="text-gray-700">
                We've grown from a small workshop to a comprehensive engineering solution provider,
                serving clients across multiple industries with our commitment to quality and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline
        <section ref={timelineRef} className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item flex mb-8">
                  <div className="w-24 flex-shrink-0 text-primary font-bold">
                    {milestone.year}
                  </div>
                  <div className="flex-grow pl-8 border-l-2 border-primary">
                    <p className="text-lg">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Team Section */}
        {/* <section className="team-section py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </div>
    </>
  );
}

export default About;