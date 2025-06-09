# Dockerfile

# Stage 1: Build the Node.js application
FROM node:22-alpine AS build 

WORKDIR /app

COPY package*.json ./
RUN npm install --production # Install only production dependencies

COPY . .

# Stage 2: Create the final image with NGINX and the built Node.js application
FROM nginx:alpine 

# Copy the custom NGINX configuration
# We remove the default NGINX config and place ours
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the Node.js application from the build stage
COPY --from=build /app /app

# Install tini to properly manage multiple processes (Node.js and NGINX)
RUN apk add --no-cache tini

# Expose port 80, which NGINX will be listening on
EXPOSE 80

# Command to start tini, then the Node.js app in the background, and NGINX in the foreground
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["sh", "-c", "node /app/server.js & nginx -g 'daemon off;'"]