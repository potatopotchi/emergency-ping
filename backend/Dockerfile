# Dockerfile for the Node.js project

FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Start the Node.js app
CMD ["node", "server.js"]