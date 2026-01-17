'use client'

import { useState, useEffect } from 'react'
import { useAnalytics } from '../lib/analytics'
import RooslyLogo from '../components/RooslyLogo'
import emailjs from '@emailjs/browser'

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
  const analytics = useAnalytics()

  useEffect(() => {
    // Track page load time
    const loadTime = performance.now()

    // Track initial page view
    analytics.trackTimeOnPage(Math.round(loadTime / 1000), 'home')

    // Track scroll depth
    let maxScrollDepth = 0
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
        maxScrollDepth = scrollPercent
        analytics.trackScrollDepth(scrollPercent)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Track time spent on page
    const timeInterval = setInterval(() => {
      const timeSpent = Math.round((performance.now() - loadTime) / 1000)
      if (timeSpent % 30 === 0 && timeSpent > 0) { // Track every 30 seconds
        analytics.trackTimeOnPage(timeSpent, 'home')
      }
    }, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timeInterval)
    }
  }, [analytics])

  const showServiceDetails = (serviceId: string) => {
    const newExpanded = serviceId === expandedService ? null : serviceId
    setExpandedService(newExpanded)

    if (newExpanded) {
      analytics.trackServiceInteraction(serviceId, 'expand')
    }
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    try {
      await emailjs.send(
        'service_tiabc2r',
        'template_8ptz2d8',
        {
          from_name: name,
          from_email: email,
          time: new Date().toISOString(),
          message: message,
          to_email: 'antonroos992@gmail.com'
        },
        'tfLmRyTiSovdCULB8'
      )
      setFormMessage('Thank you! We will get back to you soon.')
      analytics.trackFormSubmit('contact_form', true)
      form.reset() // Clear the form
    } catch (error) {
      console.error('Email send error:', error)
      setFormMessage('Sorry, there was an error sending your message. Please try again.')
      analytics.trackFormSubmit('contact_form', false)
    }
    setTimeout(() => setFormMessage(''), 5000)
  }

  const scrollToSection = (sectionId: string) => {
    analytics.trackNavigation('hero', sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCTAClick = () => {
    analytics.trackButtonClick('explore_services', 'hero')
    scrollToSection('services')
  }

  const handleLearnMoreClick = (serviceId: string, isExpanded: boolean) => {
    analytics.trackButtonClick(`learn_more_${serviceId}`, 'services')
    if (isExpanded) {
      analytics.trackServiceInteraction(serviceId, 'contact')
      scrollToSection('contact')
    } else {
      showServiceDetails(serviceId)
    }
  }

  const handleSocialClick = (platform: string) => {
    analytics.trackSocialInteraction(platform, 'click')
  }

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <RooslyLogo className="logo" size={50} />
          <ul className="nav-menu">
            <li><a href="#services" onClick={(e) => { e.preventDefault(); analytics.trackNavigation('nav', 'services'); scrollToSection('services') }}>Services</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); analytics.trackNavigation('nav', 'about'); scrollToSection('about') }}>About</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); analytics.trackNavigation('nav', 'contact'); scrollToSection('contact') }}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Roosly</h1>
          <p>Your Partner in Digital Transformation</p>
          <button className="cta-button" onClick={handleCTAClick}>Explore Our Services</button>
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
                <button className="learn-more" onClick={() => handleLearnMoreClick(id, expandedService === id)}>
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
          <p>At Roosly, we&apos;re passionate about delivering innovative digital solutions that drive real business value. With a team of experienced developers, consultants, and AI specialists, we transform ideas into powerful digital products.</p>
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
            <a href="#" onClick={() => handleSocialClick('twitter')}>Twitter</a>
            <a href="#" onClick={() => handleSocialClick('linkedin')}>LinkedIn</a>
            <a href="#" onClick={() => handleSocialClick('github')}>GitHub</a>
            <a href="#" onClick={() => handleSocialClick('facebook')}>Facebook</a>
          </div>
        </div>
      </footer>
    </>
  )
}
