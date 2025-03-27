"use client";
import React, { useEffect, useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null); // Fixed typo: HTMLElement instead of HTMLElementElement

  // Scroll animation logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-on-scroll");
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of element is in view
    );

    // Null check for sectionRef.current
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll(".scroll-trigger");
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect(); // Cleanup
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-cyan-400 via-blue-300 to-teal-400 relative overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3),_transparent_60%)] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float delay-1000"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl text-gray-900 font-poppins font-extrabold mb-6 tracking-tight scroll-trigger opacity-0">
          About <span className="text-orange-500 drop-shadow-md">CollegeMart</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-800 mb-12 font-poppins max-w-3xl mx-auto scroll-trigger opacity-0 delay-200">
          Your <span className="text-teal-600 font-semibold">one-stop campus marketplace</span> – buy, sell, swap textbooks, tech, and more with a student-first vibe!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 scroll-trigger opacity-0 delay-300 group">
            <h2 className="text-2xl text-cyan-600 font-poppins font-bold mb-4 drop-shadow-sm group-hover:text-cyan-700 transition-colors duration-300">
              Why We Exist
            </h2>
            <p className="text-gray-700 font-poppins leading-relaxed">
              College life’s a grind – pricey books, wasteful clutter. We’re here to save your cash and campus, one swap at a time.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-300 scroll-trigger opacity-0 delay-400 group">
            <h2 className="text-2xl text-cyan-600 font-poppins font-bold mb-4 drop-shadow-sm group-hover:text-cyan-700 transition-colors duration-300">
              Our Mission
            </h2>
            <ul className="text-left text-gray-700 font-poppins list-none space-y-3">
              <li><span className="text-orange-500 font-semibold">Affordability:</span> Slash textbook costs.</li>
              <li><span className="text-orange-500 font-semibold">Sustainability:</span> Reuse, reduce, repeat.</li>
              <li><span className="text-orange-500 font-semibold">Community:</span> Campus crew, united.</li>
              <li><span className="text-orange-500 font-semibold">Convenience:</span> Deals, student-style.</li>
            </ul>
          </div>

          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 scroll-trigger opacity-0 delay-500 group">
            <h2 className="text-2xl text-cyan-600 font-poppins font-bold mb-4 drop-shadow-sm group-hover:text-cyan-700 transition-colors duration-300">
              What Sets Us Apart
            </h2>
            <ul className="text-left text-gray-700 font-poppins list-none space-y-3">
              <li><span className="text-orange-500 font-semibold">Secure Login:</span> Safe profiles.</li>
              <li><span className="text-orange-500 font-semibold">Easy Listings:</span> Post in seconds.</li>
              <li><span className="text-orange-500 font-semibold">Smart Search:</span> Find it fast.</li>
              <li><span className="text-orange-500 font-semibold">Real-Time Chat:</span> Instant connect.</li>
              <li><span className="text-orange-500 font-semibold">Top Tech:</span> MongoDB </li>
              <li><span className="text-orange-500 font-semibold">Any Device:</span> Works everywhere.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 scroll-trigger opacity-0 delay-600">
          <h3 className="text-3xl md:text-4xl text-gray-900 font-poppins font-bold mb-6 tracking-wide drop-shadow-md">
            Join the <span className="text-orange-500">Revolution</span>
          </h3>
          <p className="text-lg md:text-xl text-gray-800 mb-8 font-poppins max-w-2xl mx-auto">
            CollegeMart isn’t just a platform – it’s a smarter, greener, <span className="text-teal-600">student-powered</span> movement.
          </p>
          <a
            href="/signup"
            className="inline-block bg-orange-500 text-white font-poppins font-semibold py-4 px-12 rounded-full hover:bg-orange-600 hover:scale-110 hover:shadow-2xl hover:animate-pulse-fast transition-all duration-300 text-lg shadow-md group"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;