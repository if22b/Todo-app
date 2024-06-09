# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application with the backend API URL
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=$VUE_APP_API_URL
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port the app runs on
EXPOSE 80

# Command to run the app
CMD ["nginx", "-g", "daemon off;"]
