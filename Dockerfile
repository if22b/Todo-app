# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files into the container
COPY . .

# Build the app
RUN npm run build

# Install a static server to serve the build
RUN npm install -g http-server

# Expose port 80
EXPOSE 80

# Run the server
CMD ["http-server", "dist", "-p 80"]
