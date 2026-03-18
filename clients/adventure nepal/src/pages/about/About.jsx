import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/front/Navbar";
import { Footer } from "@/components/front/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  MapPin,
  Calendar,
  Award,
  Star,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stats = [
  { icon: Users, number: "10K+", label: "Happy Clients" },
  { icon: MapPin, number: "50+", label: "Destinations" },
  { icon: Calendar, number: "26+", label: "Years Experience" },
  { icon: Award, number: "500+", label: "Tours Completed" },
];

const team = [
  { name: "Ram Bahadur", role: "Founder & CEO", img: "/images/team1.jpg" },
  { name: "Sita Gurung", role: "Tour Director", img: "/images/team2.jpg" },
  { name: "Hari Thapa", role: "Operations Manager", img: "/images/team3.jpg" },
];

const testimonials = [
  {
    text: "Adventure Nepal made our Everest Base Camp trek unforgettable! Professional guides and perfect planning.",
    author: "John Doe, USA",
    rating: 5,
  },
  {
    text: "Rara Lake tour was magical. Vehicles were comfortable, service top-notch.",
    author: "Maria Silva, Brazil",
    rating: 5,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            About Adventure Nepal
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            26+ Years Crafting Unforgettable Journeys Across the Himalayas and
            Beyond
          </p>
          <Button
            size="lg"
            className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
          >
            Explore Our Tours
          </Button>
        </motion.div>
      </section>

      {/* Company Story */}
      <motion.section
        className="py-24 px-4 md:px-8 lg:px-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Founded in 1998, Adventure Nepal started as a small team of
                passionate trekkers dreaming of sharing Nepal&apos;s majestic
                landscapes with the world. Today, we&apos;re Nepal&apos;s
                premier adventure travel company, specializing in bespoke tours,
                luxury vehicle rentals, and immersive cultural experiences.
              </p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-green-600" /> 26+ Years of
                  Excellence
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-green-600" /> Nepal&apos;s
                  Most Destinations
                </li>
                <li className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-green-600" /> Trusted by 10K+
                  Travelers
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-12 rounded-3xl shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl text-center">
                    <Award className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h3 className="font-bold text-2xl">Award Winning</h3>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl text-center">
                    <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                    <h3 className="font-bold text-2xl">5-Star Rated</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-icon bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl mx-auto mb-4 shadow-xl group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </h3>
                <p className="text-lg text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Mission Vision */}
      <motion.section
        className="py-24 px-4 md:px-8 lg:px-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Promise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sustainable tourism, authentic experiences, and memories that last a
            lifetime.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Authentic Nepal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                Off-the-beaten-path destinations like Upper Mustang, Rara Lake,
                and Dhorpatan. Experience real Nepal with local guides.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Personalized Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                Small groups, custom itineraries. Luxury vehicles for transfers.
                24/7 support during your adventure.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Team */}
      <motion.section
        className="py-24 px-4 md:px-8 lg:px-16 bg-gray-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground">
            Passionate locals who live and breathe adventure
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-6 group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className="text-lg text-muted-foreground mb-4 font-medium">
                {member.role}
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-24 px-4 md:px-8 lg:px-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Travelers Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Trusted by adventurers worldwide
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-2xl col-span-1 hover:shadow-3xl transition-all duration-300 bg-gradient-to-b from-white/80 to-gray-50/80 backdrop-blur-sm"
            >
              <CardContent className="pt-12 pb-8">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-lg italic mb-8 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      Verified Traveler
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Adventure?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s create memories that last a lifetime. Book your dream
            Nepal adventure today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-gray-100 text-lg px-12 py-6 font-semibold"
            >
              Book a Tour
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-green-700 text-lg px-12 py-6 font-semibold"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default About;
