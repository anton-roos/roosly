'use client'

import { useState } from 'react'

const serviceDetails = {
  websites: {
    title: 'Website Creation & Hosting',
    icon: '🌐',
    description: 'We design and deploy stunning websites tailored to your business needs, with reliable hosting and maintenance.',
    features: ['Responsive Design', 'SEO Optimization', 'Performance Tuning', 'SSL Security', '24/7 Hosting Support', 'Regular Backups']
  },
  software: {
    title: 'Custom Software Engineering',
    icon: '💻',
    description: 'End-to-end software solutions designed specifically for your business challenges and goals.',
    features: ['System Architecture', 'Full-Stack Development', 'Quality Assurance', 'Scalable Solutions', 'Cloud Integration', 'Maintenance & Support']
  },
  apps: {
    title: 'App Development',
    icon: '📱',
    description: 'Native and cross-platform mobile applications built with modern technologies and best practices.',
    features: ['iOS & Android', 'React Native', 'Flutter', 'User Experience Design', 'App Store Deployment', 'Analytics Integration']
  },
  technical: {
    title: 'Technical Consultation',
    icon: '🔧',
    description: 'Expert guidance on architecture, infrastructure, and technology strategy for your projects.',
    features: ['Architecture Review', 'Technology Stack Selection', 'Performance Analysis', 'Security Assessment', 'DevOps Strategy', 'Team Training']
  },
  ai: {
    title: 'AI Consultation',
    icon: '🤖',
    description: 'Harness the power of artificial intelligence with our strategic consultation and implementation services.',
    features: ['ML Model Development', 'LLM Integration', 'Data Analysis', 'Predictive Analytics', 'Automation Solutions', 'AI Strategy Planning']
  },
  performance: {
    title: 'Performance Optimization',
    icon: '⚡',
    description: 'Speed up your digital products with performance analysis and optimization strategies.',
    features: ['Code Profiling', 'Database Optimization', 'Caching Strategies', 'Load Testing', 'CDN Setup', 'Monitoring & Alerts']
  }
}

export default function Home() {
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [formMessage, setFormMessage] = useState('')

  const showServiceDetails = (serviceId: string) => {
    setExpandedService(serviceId === expandedService ? null : serviceId)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setFormMessage('Thank you! We will get back to you soon.')
    setTimeout(() => setFormMessage(''), 5000)
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Roosly</div>
          <ul className="nav-menu">
            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Services</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Roosly</h1>
          <p>Your Partner in Digital Transformation</p>
          <button className="cta-button" onClick={() => scrollToSection('services')}>Explore Our Services</button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            {Object.entries(serviceDetails).map(([id, service]) => (
              <div key={id} className={`service-card ${expandedService === id ? 'expanded' : ''}`}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {expandedService === id && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Key Features:</h4>
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                      {service.features.map((feature, index) => (
                        <li key={index} style={{ color: 'var(--text-light)', padding: '0.25rem 0' }}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button className="learn-more" onClick={() => expandedService === id ? scrollToSection('contact') : showServiceDetails(id)}>
                  {expandedService === id ? 'Get Started' : 'Learn More'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About Roosly</h2>
          <p>At Roosly, we're passionate about delivering innovative digital solutions that drive real business value. With a team of experienced developers, consultants, and AI specialists, we transform ideas into powerful digital products.</p>
          <div className="about-features">
            <div className="feature">
              <h4>Expert Team</h4>
              <p>Seasoned professionals with years of experience across all major technologies.</p>
            </div>
            <div className="feature">
              <h4>Client-Focused</h4>
              <p>We prioritize your success and work closely with you every step of the way.</p>
            </div>
            <div className="feature">
              <h4>Innovation First</h4>
              <p>Always exploring cutting-edge technologies to deliver the best solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows={5} required></textarea>
            <button type="submit" className="submit-btn">Send Message</button>
            {formMessage && (
              <div id="form-message" className="success" style={{ display: 'block' }}>
                {formMessage}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Roosly. All rights reserved.</p>
          <div className="social-links">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
            <a href="#">Facebook</a>
          </div>
        </div>
      </footer>
    </>
  )
}
