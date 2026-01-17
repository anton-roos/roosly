'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAnalytics } from '../lib/analytics'
import RooslyLogo from '../components/RooslyLogo'
import emailjs from '@emailjs/browser'

interface ServiceDetail {
  title: string
  icon: string
  description: string
  features: string[]
}

type ServiceId = keyof typeof serviceDetails

const serviceDetails = {
  ai_strategy: {
    title: 'AI Transformation & Consulting',
    icon: '🧠', // Brain icon feels more "partner" than a robot
    description: 'We audit your business DNA to identify high-impact AI opportunities that reduce overhead and unlock new revenue streams.',
    features: ['AI Readiness Audit', 'Custom LLM Implementation', 'Workflow Automation', 'Predictive Growth Modeling', 'Data Strategy', 'Ethical AI Governance']
  },
  intelligent_software: {
    title: 'Cognitive Software Engineering',
    icon: '💻',
    description: 'We don’t just build code; we build systems that think. Custom software infused with machine learning to automate complex decision-making.',
    features: ['Self-Optimizing Systems', 'Intelligent API Integration', 'Scalable Cloud Architecture', 'Automated QA', 'Legacy System Modernization']
  },
  smart_ecosystems: {
    title: 'High-Performance Web Ecosystems',
    icon: '🌐',
    description: 'Beyond static sites. We build AI-driven digital platforms that personalize user experiences and convert visitors into partners.',
    features: ['AI-Driven Personalization', 'Dynamic SEO Content', 'User Behavior Analytics', 'Neural Search Integration', 'Global Edge Hosting']
  },
  mobile_intelligence: {
    title: 'Intelligent App Development',
    icon: '📱',
    description: 'Next-gen mobile applications that leverage on-device AI for smarter, faster, and more intuitive user interactions.',
    features: ['Predictive UX/UI', 'Voice & Image Recognition', 'Cross-Platform Excellence', 'Real-time Data Sync', 'Biometric Security']
  },
  strategic_ops: {
    title: 'Technical & Business Advisory',
    icon: '🤝',
    description: 'Your fractional CTO and Business Partner. We align your technology roadmap with your long-term commercial objectives.',
    features: ['Digital Transformation Roadmap', 'Tech Stack Optimization', 'Security & Risk Assessment', 'Infrastructure Scaling', 'Team Capability Building']
  },
  automation_performance: {
    title: 'Autonomous Performance',
    icon: '⚡',
    description: 'Eliminating digital friction. We use automated monitoring and AI-driven tuning to ensure your systems run at peak efficiency 24/7.',
    features: ['Automated Load Balancing', 'Predictive Maintenance', 'Real-time Speed Optimization', 'Database Self-Tuning', 'Security Autopilot']
  }
}

export default function Home() {
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [formMessage, setFormMessage] = useState('')
  const [isSending, setIsSending] = useState(false) // Add loading state
  const analytics = useAnalytics()

  useEffect(() => {
    const loadTime = performance.now()
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

    window.addEventListener('scroll', handleScroll, { passive: true })

    const timeInterval = setInterval(() => {
      const timeSpent = Math.round((performance.now() - loadTime) / 1000)
      if (timeSpent % 30 === 0 && timeSpent > 0) {
        analytics.trackTimeOnPage(timeSpent, 'home')
      }
    }, 30000) // Check every 30 seconds instead of every second

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timeInterval)
    }
  }, [analytics])

  const showServiceDetails = useCallback((serviceId: string) => {
    const newExpanded = serviceId === expandedService ? null : serviceId
    setExpandedService(newExpanded)

    if (newExpanded) {
      analytics.trackServiceInteraction(serviceId, 'expand')
    }
  }, [expandedService, analytics])

  const handleContactSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    setIsSending(true)
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          time: new Date().toISOString(),
          message: message,
        },
        publicKey
      )
      setFormMessage('Thank you! We will get back to you soon.')
      analytics.trackFormSubmit('contact_form', true)
      form.reset() // Clear the form
    } catch (error) {
      console.error('Email send error:', error)
      setFormMessage('Sorry, there was an error sending your message. Please try again.')
      analytics.trackFormSubmit('contact_form', false)
    } finally {
      setIsSending(false)
    }
    setTimeout(() => setFormMessage(''), 5000)
  }, [analytics])

  const scrollToSection = useCallback((sectionId: string) => {
    analytics.trackNavigation('hero', sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }, [analytics])

  const handleCTAClick = useCallback(() => {
    analytics.trackButtonClick('explore_services', 'hero')
    scrollToSection('services')
  }, [analytics, scrollToSection])

  const handleLearnMoreClick = useCallback((serviceId: string, isExpanded: boolean) => {
    analytics.trackButtonClick(`learn_more_${serviceId}`, 'services')
    if (isExpanded) {
      analytics.trackServiceInteraction(serviceId, 'contact')
      scrollToSection('contact')
    } else {
      showServiceDetails(serviceId)
    }
  }, [analytics, scrollToSection, showServiceDetails])

  const handleSocialClick = useCallback((platform: string) => {
    analytics.trackSocialInteraction(platform, 'click')
  }, [analytics])

  return (
    <>
      {/* Navigation */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <div className="logo">
            <RooslyLogo className="logo-icon" size={50} />
            <span className="logo-title">Roosly</span>
          </div>
          <ul className="nav-menu" role="list">
            <li><a href="#services" onClick={(e) => { e.preventDefault(); analytics.trackNavigation('nav', 'services'); scrollToSection('services') }} aria-label="Navigate to Services section">Services</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); analytics.trackNavigation('nav', 'about'); scrollToSection('about') }} aria-label="Navigate to About section">About</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); analytics.trackNavigation('nav', 'contact'); scrollToSection('contact') }} aria-label="Navigate to Contact section">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Business, Evolved through Intelligence.</h1>
          <p>We partner with ambitious companies to audit, automate, and optimize your entire digital ecosystem using bespoke AI solutions.</p>
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
                <button 
                  className="learn-more" 
                  onClick={() => handleLearnMoreClick(id, expandedService === id)}
                  aria-label={`${expandedService === id ? 'Get started' : 'Learn more'} about ${service.title}`}
                  aria-expanded={expandedService === id}
                >
                  {expandedService === id ? 'Get Started' : 'Learn More'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <form className="contact-form" onSubmit={handleContactSubmit} aria-label="Contact form">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              aria-label="Your name"
              autoComplete="name"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
              aria-label="Your email address"
              autoComplete="email"
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows={5} 
              required
              aria-label="Your message"
            ></textarea>
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSending}
              aria-label={isSending ? 'Sending message...' : 'Send message'}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
            {formMessage && (
              <div id="form-message" className="success" style={{ display: 'block' }}>
                {formMessage}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>Beyond Development: Your Strategic AI Partner</h2>
          <p>
            Roosly was founded to bridge the gap between complex AI potential and real-world business growth.
            We don't just deliver code; we provide the <strong>digital architecture</strong> and <strong>strategic intelligence</strong>
            required to lead in an AI-first economy. From auditing internal workflows to deploying custom neural networks,
            we look at your business as a whole to ensure every digital touchpoint is an asset.
          </p>

          <div className="about-features">
            <div className="feature">
              <h4>The Holistic Audit</h4>
              <p>We analyze your existing digital footprint to identify friction points where AI can unlock immediate ROI and efficiency.</p>
            </div>
            <div className="feature">
              <h4>Integrated AI Strategy</h4>
              <p>Our consultants don’t work in silos. We integrate intelligent automation into your core business processes, not just the edges.</p>
            </div>
            <div className="feature">
              <h4>Sustainable Scalability</h4>
              <p>We build with the future in mind, ensuring your software, apps, and data structures are ready for the next decade of digital evolution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Roosly. All rights reserved.</p>
          <div className="social-links" role="list" aria-label="Social media links">
            <a 
              href="https://x.com/antonieroos" 
              onClick={() => handleSocialClick('x')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on X (formerly Twitter)"
            >X</a>
            <a 
              href="https://www.linkedin.com/in/antonroos/" 
              onClick={() => handleSocialClick('linkedin')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with us on LinkedIn"
            >LinkedIn</a>
            <a 
              href="https://github.com/anton-roos" 
              onClick={() => handleSocialClick('github')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View our projects on GitHub"
            >GitHub</a>
          </div>
        </div>
      </footer>
    </>
  )
}
