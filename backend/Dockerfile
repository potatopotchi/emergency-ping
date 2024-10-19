# Dockerfile for the Node.js project

FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json .
RUN npm ci

# Copy the application code
COPY . .

# Start the Node.js app
CMD ["npm", "start"]