# Roosly

A professional website for Roosly, a digital services company specializing in website creation, software engineering, app development, technical consultation, and AI consultation.

## Features

- Responsive design
- Interactive service details with React state
- Contact form
- Modern UI with smooth animations
- Built with Next.js for optimal performance

## Technologies Used

- Next.js 16 with App Router
- React 18
- TypeScript
- Custom CSS3
- Google Analytics 4
- JavaScript for dynamic content

## Google Analytics Setup

This project includes comprehensive Google Analytics 4 (GA4) tracking for detailed insights into user behavior.

### 1. Create a GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for your website
3. Note down your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

1. Copy `.env.local` and update it:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID

### 3. What Gets Tracked

The analytics implementation tracks:

**Page Analytics:**
- Page views and load times
- Time spent on page (every 30 seconds)
- Scroll depth (25%, 50%, 75%, 100%)

**User Interactions:**
- Button clicks (CTA, Learn More, Social links)
- Navigation between sections
- Form submissions
- Service detail expansions

**Custom Events:**
- Service interactions (view, expand, contact)
- Social media clicks
- Error tracking
- Performance metrics

**E-commerce Ready:**
- Purchase tracking functions (for future use)
- Custom dimensions and metrics support

### 4. Viewing Analytics Data

After deployment, you can view comprehensive stats in Google Analytics:

- **Real-time**: See live user activity
- **Audience**: Demographics, interests, geography
- **Acquisition**: How users find your site
- **Behavior**: Pages viewed, time on site, bounce rate
- **Conversions**: Form submissions, service inquiries
- **Events**: Custom interactions and button clicks

### 5. Custom Reports

Create custom reports for:
- Service popularity (which services users explore most)
- Conversion funnel (hero → services → contact)
- User engagement (scroll depth, time on page)
- Button performance (which CTAs work best)

## Deployment

This site is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will deploy automatically.

### Local Development

To run locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Add your GA4 Measurement ID to `.env.local`
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Services Offered

- **Website Creation & Hosting**: Custom websites with hosting and maintenance
- **Custom Software Engineering**: End-to-end software solutions
- **App Development**: iOS, Android, and cross-platform apps
- **Technical Consultation**: Architecture and technology strategy
- **AI Consultation**: ML, LLM integration, and AI strategy
- **Performance Optimization**: Speed and efficiency improvements
