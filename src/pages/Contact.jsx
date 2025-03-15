import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import gsap from 'gsap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phone: Yup.string()
    .matches(/^[0-9+\-() ]+$/, 'Invalid phone number')
    .min(10, 'Too Short!')
    .required('Required'),
  message: Yup.string()
    .min(10, 'Too Short!')
    .required('Required'),
});

function Contact() {
  useEffect(() => {
    gsap.from('.contact-info', {
      x: -50,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2
    });

    gsap.from('.contact-form', {
      y: 50,
      opacity: 1,
      duration: 0.8,
      delay: 0.3
    });
  }, []);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate form submission
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      resetForm();
      alert('Thank you for your message. We will contact you soon!');
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - MK Enterprise</title>
        <meta name="description" content="Get in touch with MK Enterprise for all your CNC motor and precision engineering needs." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-2xl">
              Get in touch with our team for inquiries about our products and services.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <div className="contact-info flex items-start space-x-4">
                    <FaPhone className="text-primary text-xl mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Phone</h3>
                      <p className="text-gray-600">+91 9429409423</p>
                    </div>
                  </div>

                  <div className="contact-info flex items-start space-x-4">
                    <FaEnvelope className="text-primary text-xl mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Email</h3>
                      <p className="text-gray-600">info@mkenterprise.com</p>
                    </div>
                  </div>

                  <div className="contact-info flex items-start space-x-4">
                    <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Address</h3>
                      <p className="text-gray-600">
                        B/11 Jalaram Compelx Rameshwar Estate Road,<br />
                        Near Virat Nagar Kenal Road<br />
                        Ahmedabad
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="contact-form bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  <Formik
                    initialValues={{
                      name: '',
                      email: '',
                      phone: '',
                      message: ''
                    }}
                    validationSchema={contactSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <Field
                            type="text"
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                          />
                          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <Field
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <Field
                            type="text"
                            name="phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                          />
                          <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <Field
                            as="textarea"
                            name="message"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                          />
                          <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary w-full"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1645564756216!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;