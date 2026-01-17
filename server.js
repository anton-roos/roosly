#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// Service details content
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
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Serve static files
    if (pathname === '/' || pathname === '/index.html') {
        serveFile(res, 'index.html', 'text/html');
    } else if (pathname === '/styles.css') {
        serveFile(res, 'styles.css', 'text/css');
    } 
    // Handle HTMX requests for service details
    else if (pathname.startsWith('/service-details/')) {
        const serviceId = pathname.replace('/service-details/', '');
        const service = serviceDetails[serviceId];
        
        if (service) {
            const html = `
                <div class="service-card">
                    <div class="service-icon">${service.icon}</div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <div style="margin-bottom: 1rem;">
                        <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">Key Features:</h4>
                        <ul style="list-style: none; padding-left: 0;">
                            ${service.features.map(f => `<li style="color: var(--text-light); padding: 0.25rem 0;">✓ ${f}</li>`).join('')}
                        </ul>
                    </div>
                    <button class="learn-more" onclick="location.href='#contact'" style="cursor: pointer;">Get Started</button>
                </div>
            `;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<p>Service not found</p>');
        }
    }
    // Handle contact form submission
    else if (pathname === '/submit-contact' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // In a real application, you would save this to a database or send an email
            console.log('Form submission:', body);
            const response = '<div class="success" style="color: #065f46; background-color: #d1fae5; padding: 1rem; border-radius: 4px;">Thank you! We will get back to you soon.</div>';
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(response);
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Not Found</h1>');
    }
});

function serveFile(res, fileName, contentType) {
    const filePath = path.join(__dirname, fileName);
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

server.listen(PORT, () => {
    console.log(`Roosly website running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});
