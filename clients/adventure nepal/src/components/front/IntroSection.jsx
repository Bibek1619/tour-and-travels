import React from "react";
import { motion } from "framer-motion";
import { Users, Award, Mountain, Compass, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useHomepageContent } from "@/contexts/HomepageContentContext";

const iconMap = {
  Mountain,
  Compass,
  Heart,
};

const statIconMap = {
  Users,
  Award,
};

const IntroSection = () => {
  const { content } = useHomepageContent();
  const { intro } = content;

  const renderWelcomeTitle = () => {
    const parts = intro.welcomeTitle.split(intro.welcomeHighlight);
    if (parts.length === 1) {
      return intro.welcomeTitle;
    }
    return (
      <>
        {parts[0]}
        <span className="text-orange-600">{intro.welcomeHighlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="bg-gradient-to-b from-white via-orange-50/30 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {renderWelcomeTitle()}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {intro.subtitle}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Rich Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="space-y-5 text-lg leading-relaxed">
              <p className="text-gray-700">{intro.description1}</p>
              <p className="text-gray-700">{intro.description2}</p>
              <p className="text-gray-700">{intro.description3}</p>
            </div>

            <Link
              to={intro.ctaLink}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {intro.ctaText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Right Column - Image & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Image Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={intro.image}
                alt="Nepal Mountains - Trekking and Tours"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">{intro.whyChooseTitle}</h3>
                <ul className="space-y-3">
                  {intro.highlights.map((highlight, index) => {
                    const IconComponent = iconMap[highlight.icon] || Mountain;
                    return (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-lg">{highlight.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats & Certifications Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Dynamic Stats */}
          {intro.stats.map((stat, index) => {
            const StatIcon = statIconMap[stat.icon] || Users;
            const bgColor = index % 2 === 0 ? 'bg-orange-100' : 'bg-green-100';
            const iconColor = index % 2 === 0 ? 'text-orange-600' : 'text-green-600';
            return (
              <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`${bgColor} p-4 rounded-xl`}>
                  <StatIcon className={`w-10 h-10 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}

          {/* Affiliations */}
          <div className="flex flex-col justify-center p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-sm text-gray-600 font-semibold mb-3 uppercase tracking-wider">
              Certified & Affiliated
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <img 
                src="/nepal-tourism-board.png" 
                alt="Nepal Tourism Board Certified" 
                className="h-14 object-contain opacity-75 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <img 
                src="/taan.png" 
                alt="TAAN Member" 
                className="h-14 object-contain opacity-75 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <img 
                src="/nma.png" 
                alt="Nepal Mountaineering Association" 
                className="h-14 object-contain opacity-75 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
