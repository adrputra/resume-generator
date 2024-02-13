# Use Node.js LTS version as base image
FROM node:20 AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller base image for serving
FROM node:20-alpine
RUN apk add --no-cache libc6-compat

# Set working directory in the container
WORKDIR /app

# Copy built application from build stage
# COPY --from=build /app/.next ./.next
# COPY --from=build /app/public ./public
# COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
# COPY --from=build /app/node_modules ./node_modules

COPY package*.json ./

# Install only production dependencies
# RUN npm install

# Expose the port on which your Next.js application will run
EXPOSE 3002

ENV PORT 3002
ENV HOSTNAME 0.0.0.0

# Start the Next.js application
# CMD ["npm", "start", "--", "--port", "3002"]
CMD [ "node", "server.js" ]
