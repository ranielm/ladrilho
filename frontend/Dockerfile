# Base stage
FROM node:20-alpine AS base
WORKDIR /app

# Development stage
FROM base AS development
COPY frontend/package*.json ./
RUN npm install
COPY packages ./packages
COPY frontend/src ./src
COPY frontend/index.html ./
COPY frontend/vite.config.ts ./
COPY frontend/tsconfig*.json ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Build stage
FROM base AS build
ARG VITE_SOCKET_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL
COPY frontend/package*.json ./
RUN npm ci
COPY packages ./packages
COPY frontend/src ./src
COPY frontend/index.html ./
COPY frontend/vite.config.ts ./
COPY frontend/tsconfig*.json ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
