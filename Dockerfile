# Use Node.js LTS as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the Next.js default port
EXPOSE 3000

# Build and start during container runtime
CMD ["sh", "-c", "npm run build && npm start"]