# Node.js version 20
FROM node:20-alpine AS builder

# Create a folder named /app and go inside
WORKDIR /app

# Copy package*.json from computer to container
COPY package*.json ./

# Download all the dependencies listed in the package file
RUN npm install

# Copy everything from pc . to container .
COPY . .

# Run the build
RUN npm run build

# Redo install for Node
FROM node:20-alpine

# Setup folder again
WORKDIR /app

# Reach into builder, and copy the finished dist folder
COPY --from=builder /app/node_modules  ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Expose a port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]