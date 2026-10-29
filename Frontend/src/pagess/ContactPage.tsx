import { useEffect, useRef } from 'react';
// import { Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FaqSection from '../components/about/FaqSection';


const Contact = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <>
      <Navbar
        searchQuery=""
        onSearchChange={() => {}}
        onCartClick={() => {}}
        onContactClick={() => {}}
      />

      {/* Banner with right-aligned contact information */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] mt-[5px]">
        <img
          src="src/3.jpg" 
          alt="Contact Banner"
          className="w-full h-full object-cover object-center opacity-100"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white px-4">
          <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-8">
            <div className="flex-1 flex flex-col justify-center md:items-start items-center text-center md:text-left" />
            <div className="max-w-md text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 tracking-wide">
                {/* Contact Us */}
              </h1>
              <address className="not-italic space-y-5 text-base md:text-lg leading-relaxed">
                <p className="flex justify-center md:justify-start items-center gap-3">
                  {/* <MapPin size={22} className="text-blue-400" /> */}
                </p>
                <p className="flex justify-center md:justify-start items-center gap-3">
                  {/* <Phone size={22} className="text-blue-400" /> */}
                  <a href="tel:+1234567890" className="underline hover:text-blue-300"></a>
                </p>
                <p className="flex justify-center md:justify-start items-center gap-3">
                  {/* <Mail size={22} className="text-blue-400" /> */}
                  <a href="mailto:support@foldmate.com" className="underline hover:text-blue-300"></a>
                </p>
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="w-full flex justify-center bg-gray-50 py-16">
        <div className="max-w-3xl w-full px-6">
          <form className="bg-white p-10 rounded-xl shadow-lg space-y-8">
            <h2 className="text-3xl font-serif font-semibold text-gray-800 mb-6 text-center">
              Get in Touch
            </h2>
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                ref={nameInputRef}
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                className="w-full border border-gray-300 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
                rows={6}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <FaqSection/>
      <Footer />
    </>
  );
};

export default Contact;


