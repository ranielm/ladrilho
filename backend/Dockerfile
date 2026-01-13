# Base stage
FROM node:20-alpine AS base
WORKDIR /app

# Development stage
FROM base AS development
COPY backend/package*.json ./
RUN npm install
COPY packages ./packages
COPY backend/src ./src
COPY backend/tsconfig.json ./
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
COPY backend/package*.json ./
RUN npm ci
COPY packages ./packages
COPY backend/src ./src
COPY backend/tsconfig.json ./
RUN npm run build

# Production stage
FROM base AS production
ENV NODE_ENV=production
COPY backend/package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/packages ./packages
EXPOSE 3001
USER node
CMD ["node", "dist/index.js"]
