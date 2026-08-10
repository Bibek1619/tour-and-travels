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

      {/* Why Our Guides Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Our Guides</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All our guides are professionally trained, licensed, and have extensive experience in the Himalayas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Certified Professionals',
                description: 'Licensed by Nepal Tourism Board'
              },
              {
                icon: MapPin,
                title: 'Experienced Climbers',
                description: '10+ years average experience'
              },
              {
                icon: Star,
                title: 'Safety First',
                description: 'First Aid & Rescue trained'
              },
              {
                icon: Users,
                title: 'Local Experts',
                description: 'Born and raised in the Himalayas'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <motion.section
        className="py-24 px-4 md:px-8 lg:px-16 bg-gray-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Expert Team</h2>
          <p className="text-xl text-muted-foreground">
            Professional, experienced, and passionate about creating unforgettable mountain adventures
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: 'Rajesh Sharma',
              role: 'Founder & Lead Guide',
              experience: '26+ Years',
              image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
              specialization: 'Everest Region Expert',
              certifications: ['Mountain Guide License', 'First Aid Certified']
            },
            {
              name: 'Sanjay Gurung',
              role: 'Senior Trekking Guide',
              experience: '15+ Years',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
              specialization: 'Annapurna & Langtang',
              certifications: ['Trekking Guide License', 'Wilderness First Responder']
            },
            {
              name: 'Karma Sherpa',
              role: 'Climbing Guide',
              experience: '12+ Years',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
              specialization: 'Peak Climbing Expeditions',
              certifications: ['Mountain Guide License', 'Rescue Trained']
            },
            {
              name: 'Pemba Lama',
              role: 'Trekking Guide',
              experience: '10+ Years',
              image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
              specialization: 'Cultural Tours & Treks',
              certifications: ['Trekking Guide License', 'Cultural Heritage Specialist']
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-orange-400 font-semibold text-sm">{member.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Experience</span>
                    <span className="font-bold text-orange-600">{member.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Specialization</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{member.specialization}</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Certifications</p>
                  <div className="space-y-1">
                    {member.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-xs text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
              className="text-green-700 border-white hover:bg-white hover:text-green-700 text-lg px-12 py-6 font-semibold"
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
