"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Code, 
  Smartphone, 
  Palette, 
  Cloud, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function GizoLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          setActiveSection(section.getAttribute("id") || "home");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Contact", id: "contact" },
  ];

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies.",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love to interact with.",
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and serverless architecture.",
    },
  ];

  const whatsappLink = "https://wa.me/0142899656";

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-sm py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Gizo</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "relative font-medium transition-colors hover:text-yellow-600",
                    activeSection === link.id ? "text-yellow-600" : "text-gray-700"
                  )}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-500 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full overflow-hidden transition-all hover:bg-yellow-300 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Reach us out</span>
                <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity" />
              </a>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="pt-24 px-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "block w-full text-left py-4 px-6 rounded-xl text-lg font-medium transition-colors",
                    activeSection === link.id
                      ? "bg-yellow-100 text-yellow-700"
                      : "hover:bg-gray-50"
                  )}
                >
                  {link.name}
                </button>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-4 px-6 mt-6 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors"
              >
                Reach us out
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-yellow-100"
          />
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="absolute rounded-full bg-yellow-400"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-sm font-medium text-yellow-700">
                  Welcome to Gizo
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                <span className="block">We Build</span>
                <span className="block text-yellow-500">Playful Tech</span>
                <span className="block">Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                Gizo crafts delightful digital experiences that blend creativity 
                with cutting-edge technology. We turn complex problems into 
                simple, beautiful, and playful solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-yellow-400 text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:bg-yellow-300 hover:scale-105 active:scale-95"
                >
                  <span>Reach us out</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                </a>
                <button
                  onClick={() => scrollToSection("services")}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold text-lg rounded-full hover:border-yellow-400 hover:text-yellow-600 transition-all"
                >
                  Explore Services
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80"
                  alt="Playful technology illustration"
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Fast Delivery</p>
                    <p className="text-sm text-gray-600">Agile & efficient</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-24 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-yellow-500">Gizo</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a team of playful problem-solvers who believe technology 
              should be as enjoyable as it is powerful.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Founded with a vision to make technology playful and accessible, 
                  Gizo has grown from a small startup to a trusted partner for 
                  businesses worldwide.
                </p>
                <p>
                  Our team combines deep technical expertise with creative thinking 
                  to deliver solutions that not only work flawlessly but bring 
                  a smile to your users' faces.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-4">
                  {[
                    { number: "50+", label: "Projects Delivered" },
                    { number: "30+", label: "Happy Clients" },
                    { number: "15+", label: "Team Members" },
                    { number: "99%", label: "Client Satisfaction" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                    >
                      <p className="text-3xl font-bold text-yellow-500">{stat.number}</p>
                      <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="Our team"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 p-6 rounded-2xl shadow-xl max-w-xs">
                <p className="font-bold text-black text-lg mb-2">
                  "Technology should be fun!"
                </p>
                <p className="text-black/70">— The Gizo Team</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-yellow-500">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to launch, we provide end-to-end solutions tailored to your needs.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-yellow-200 transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-70 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors">
                    <service.icon className="w-8 h-8 text-yellow-600 group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-6 flex items-center text-yellow-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-4">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 2, delay: i * 0.2 }}
              className="absolute rounded-full bg-yellow-400"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Create Something <span className="text-yellow-400">Amazing</span> Together
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Have a project in mind? We'd love to hear about it. Reach out to 
                discuss how we can help bring your vision to life with our playful 
                yet professional approach.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">Call us</p>
                    <p className="text-lg">014-2899656</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">Email us</p>
                    <p className="text-lg">hello@gizo.tech</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">Visit us</p>
                    <p className="text-lg">123 Tech Street, Innovation City</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex w-full items-center justify-center gap-3 px-8 py-4 bg-yellow-400 text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:bg-yellow-300 hover:scale-[1.02] active:scale-95"
                >
                  <span>Reach us out on WhatsApp</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                </a>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Gizo</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="hover:text-yellow-600 transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <p className="text-gray-500 text-sm text-center md:text-right">
              © {new Date().getFullYear()} Gizo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}