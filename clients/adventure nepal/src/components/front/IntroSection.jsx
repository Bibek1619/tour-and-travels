import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Award, Heart } from "lucide-react";

const IntroSection = () => {
  const featuredPackages = [
    "Nepal Family Holiday",
    "Nepal Vacation Tour",
    "Sunrise/Sunset Tour",
    "Chitwan Safari Tour",
    "Kathmandu Valley Trek",
    "Bhutan Tour Package",
    "Tibet Tour Package",
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Dear Travellers, <span className="text-orange-600">Namaste</span> and Welcome
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto mb-8"></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">
                  Plan Nepal Travels & Tours (P.) Ltd.
                </span>{" "}
                a leading online travel agency in Nepal. A Destination Management Company 
                in Nepal, We are one of key travel agents in Nepal that brings tours of 
                <span className="font-semibold text-orange-600"> "Incredible Nepal"</span>, 
                the country that has mystified the world for centuries.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Your tour to Nepal, a colorfully diverse country, will enchant you with 
                the beauty of its <span className="font-semibold">Culture, Mountain and Nature</span>. 
                These tours to Nepal will enrich you with its culture, heritage, wildlife, 
                flora & fauna, folklore, festivals, spirituality, philosophy and at the 
                same time surprise you with its modernity.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Nepal tour & travel packages also offers the welcoming smile of hospitable 
                people who make it a must experience destination.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
            >
              View More
            </motion.button>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Users className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">10K+</p>
                  <p className="text-sm text-gray-600">Happy Travelers</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Award className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">15+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>

            {/* Affiliated From */}
            <div className="pt-8">
              <p className="text-gray-600 font-semibold mb-4 text-sm">Affiliated From</p>
              <div className="flex flex-wrap items-center gap-4">
                <img 
                  src="/nepal-tourism-board.png" 
                  alt="Nepal Tourism Board" 
                  className="h-16 object-contain hover:scale-110 transition-transform"
                />
                <img 
                  src="/nma.png" 
                  alt="Nepal Mountaineering Association" 
                  className="h-16 object-contain hover:scale-110 transition-transform"
                />
                <img 
                  src="/taan.png" 
                  alt="TAAN" 
                  className="h-16 object-contain hover:scale-110 transition-transform"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Featured Packages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-800">Featured Packages</h3>
            </div>

            <ul className="space-y-4">
              {featuredPackages.map((pkg, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-orange-50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-2 h-2 bg-orange-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="text-gray-700 group-hover:text-orange-600 font-medium transition-colors duration-300">
                    {pkg}
                  </span>
                  <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-500 ml-auto transition-colors duration-300" />
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
            >
              Explore All Packages
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
