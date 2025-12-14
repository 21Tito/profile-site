# Portfolio Site

Modern, responsive portfolio website with multi-page layout and centralized content management.

## Features

- Multi-page layout (Home, Projects, Experience, How I Work, Tech Stack)
- Centralized content management via JSON
- Dynamic content loading
- Responsive design with modern UI
- Contact form with email notifications
- LinkedIn-style experience timeline
- Project showcase with case studies

## Contact Form Setup

The contact form sends email notifications when visitors submit messages.

### Required Configuration:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get a Gmail App Password:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled
   - Scroll to "App passwords" and create a new one
   - Select "Mail" and your device
   - Copy the 16-character password

3. Update `.env` file:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_APP_PASSWORD=your_16_character_app_password
   ```

### Optional: MongoDB Storage

To also store form submissions in MongoDB, add:
```
MONGODB_URI=your_mongodb_connection_string
```

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (see above)

3. Start the server:
   ```bash
   npm start
   ```

4. Open `http://localhost:3001` in your browser

## Deployment

This site is configured for deployment on platforms like:
- GitHub Pages (static files)
- Render/Heroku (Node.js server for contact form)

Make sure to set environment variables in your deployment platform's settings. 
