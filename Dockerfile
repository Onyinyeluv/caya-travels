FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY caya-duffel-backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend code
COPY caya-duffel-backend/ .

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
