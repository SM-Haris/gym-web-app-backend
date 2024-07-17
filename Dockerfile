# Build stage
FROM node:lts-alpine AS build

WORKDIR /gym-up/

# Copy package.json and package-lock.json
COPY package*.json ./

# Use npm cache to speed up builds
RUN --mount=type=cache,target=/gym-up/.npm \
    npm set cache /gym-up/.npm && \
    npm ci

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Production stage
FROM node:lts-alpine

WORKDIR /gym-up/

# Copy built files from the build stage
COPY --from=build /gym-up/build ./build
COPY ./config ./config
COPY --from=build /gym-up/package*.json ./
COPY ./.env.production ./.env

# Install only production dependencies
RUN npm install --only=production

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
