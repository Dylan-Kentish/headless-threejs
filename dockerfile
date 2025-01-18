# Use the official Puppeteer base image
FROM ghcr.io/puppeteer/puppeteer:24.1.0

# Switch to root for installation
USER root

# Update and install base tools and dependencies
RUN apt-get update && apt-get install -y \
    pip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Node.js dependencies
COPY package*.json /app/
RUN npm install

# Install Python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt --break-system-packages

# Copy application code
COPY src/ /app/
COPY resources/ /app/resources/

# Set the default entry point for the container
CMD ["python3", "-u", "handler.py"]
