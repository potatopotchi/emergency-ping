# Dockerfile for the React project

FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

RUN npm build

# Start the React app
CMD ["npm", "start"]