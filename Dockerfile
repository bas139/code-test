FROM node:20-bullseye

# Update package list and install necessary compilers/tools
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory to the app root
WORKDIR /app

# Copy package.json and install frontend dependencies
COPY package*.json ./
RUN npm install

# Copy all the frontend files
COPY . .

# Build the Vite frontend application
RUN npm run build

# Change working directory to backend
WORKDIR /app/backend

# Install backend dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["node", "server.js"]
