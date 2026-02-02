# Caya Duffel Backend

Flight search and booking backend powered by Duffel API.

## Deployment

This backend is configured to run on Render, Railway, Heroku, or any Node.js hosting platform.

### Environment Variables Required:
- `DUFFEL_API_KEY` - Your Duffel API key
- `EMAIL_USER` - Email address for sending notifications
- `EMAIL_PASSWORD` - Email password/app password
- `PORT` - Server port (default: 3000)

### Quick Start:
```bash
npm install
node server.js
```

Server will run on http://localhost:3000
