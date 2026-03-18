import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/front/Navbar";
import { Footer } from "@/components/front/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "Thamel Marg, Kathmandu 44600, Nepal",
    link: "https://maps.google.com/?q=Thamel,Kathmandu",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+977 9841 234 567",
    link: "tel:+9779841234567",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "info@adventurenepal.com.np",
    link: "mailto:info@adventurenepal.com.np",
  },
  {
    icon: Clock,
    title: "Office Hours",
    detail: "Mon - Fri: 9AM - 7PM | Sat: 10AM - 5PM | Sun: Closed",
  },
];

const faq = [
  {
    question: "How do I book a tour?",
    answer:
      "Contact us via form, phone, or email. We'll customize your perfect itinerary within 24 hours.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Bank transfer, credit/debit cards (Visa/Mastercard), IME Pay, Khalti, and cash on arrival for smaller bookings.",
  },
  {
    question: "Do you offer private tours?",
    answer:
      "Yes! All our tours can be customized for private groups, couples, or solo travelers.",
  },
  {
    question: "What about travel insurance?",
    answer:
      "We recommend comprehensive travel insurance. We can help arrange it or provide guidance.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Message sent! We'll reply within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          className="relative z-10 max-w-7xl mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white/80 to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Ready to start your adventure? Send us a message and let's plan
              your perfect Nepal journey together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-gray-100 shadow-2xl text-lg px-12 py-8 font-bold"
              >
                Send Message
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/80 hover:bg-white/10 text-lg px-12 py-8 font-bold"
              >
                Call Us Now
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-24">
        {/* Contact Info & Map */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 mb-24 items-start"
        >
          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-r from-white to-gray-50/50 hover:-translate-y-2 cursor-pointer overflow-hidden">
                  <CardContent className="p-8 pt-10 pb-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 mx-auto">
                      <info.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-3 group-hover:text-emerald-600 transition-colors text-center">
                      {info.title}
                    </CardTitle>
                    <p className="text-xl font-medium text-muted-foreground mb-4 text-center leading-relaxed">
                      {info.detail}
                    </p>
                    {info.link && (
                      <Button
                        variant="ghost"
                        className="w-full justify-center h-12"
                        asChild
                      >
                        <a
                          href={info.link}
                          className="gap-2 text-lg font-semibold hover:text-emerald-600"
                        >
                          {info.icon === Phone ? "Call Now" : "Send Email"}
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl shadow-2xl overflow-hidden border-0"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.361482345678!2d85.324!3d27.717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb197Thamel%2C%20Kathmandu%2044600!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1690000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[450px] md:h-[500px]"
              title="Adventure Nepal Location"
            />
          </motion.div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-b from-white via-white/80 to-gray-50/60 backdrop-blur-xl overflow-hidden">
            <CardHeader className="text-center pb-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                Send Us A Message
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </CardHeader>
            <CardContent className="p-12 pt-0">
              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-8"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-semibold">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-14 text-lg py-6 px-6 border-2 border-gray-200 hover:border-emerald-300 focus:border-emerald-500 focus-visible:ring-emerald-500 shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg font-semibold">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-14 text-lg py-6 px-6 border-2 border-gray-200 hover:border-emerald-300 focus:border-emerald-500 focus-visible:ring-emerald-500 shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4 md:mt-8 md:ml-8">
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-lg font-semibold">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Tour inquiry, booking, general question..."
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="h-14 text-lg py-6 px-6 border-2 border-gray-200 hover:border-emerald-300 focus:border-emerald-500 focus-visible:ring-emerald-500 shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-lg font-semibold">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your dream adventure..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      className="text-lg py-6 px-6 border-2 border-gray-200 hover:border-emerald-300 focus:border-emerald-500 focus-visible:ring-emerald-500 shadow-sm transition-all duration-200 resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 md:col-span-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Send className="h-6 w-6 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.section>

        {/* Social & FAQ */}
        <motion.section
          className="grid lg:grid-cols-2 gap-16 mt-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Social */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-emerald-50 to-green-50">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <MessageCircle className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold mb-4">
                Follow Us
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Stay updated with latest tours and adventures
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  {
                    icon: Facebook,
                    href: "https://facebook.com/adventurenepal",
                    color: "from-blue-600 to-blue-700",
                  },
                  {
                    icon: Instagram,
                    href: "https://instagram.com/adventurenepal",
                    color: "from-pink-500 to-rose-500",
                  },
                  {
                    icon: Twitter,
                    href: "https://twitter.com/adventurenepal",
                    color: "from-sky-400 to-blue-500",
                  },
                  {
                    icon: Youtube,
                    href: "https://youtube.com/adventurenepal",
                    color: "from-red-500 to-rose-600",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div
                      className={`w-20 h-20 ${social.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                    >
                      <social.icon className="h-8 w-8 text-white" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {faq.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  >
                    <span className="font-semibold text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-6 w-6 transition-transform duration-200 ${expandedFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pl-4 text-muted-foreground text-lg leading-relaxed mt-2"
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
