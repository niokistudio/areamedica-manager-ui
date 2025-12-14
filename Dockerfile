## ============================================
## Areamedica Manager UI - Multi-Stage Docker Build
## ============================================
## This Dockerfile creates a secure, optimized production image
## for the Next.js 15 application with the following features:
##
## Security Features:
## - Multi-stage build to minimize attack surface
## - Non-root user execution
## - Alpine Linux base (minimal, security-focused)
## - Production-only dependencies
## - No development tools in final image
##
## Optimization Features:
## - Layer caching for faster rebuilds
## - Minimal final image size (~150MB)
## - Standalone Next.js output
## ============================================
#
## ============================================
## Stage 1: Dependencies
## ============================================
## Install all dependencies (including devDependencies)
## This stage is cached and reused unless package files change
#FROM node:24.9-slim AS deps
#
## Set working directory
#WORKDIR /app
#
## Install essential packages for Debian slim
## Required for some native Node.js modules like lightningcss
#RUN apt-get update && apt-get install -y --no-install-recommends \
#    ca-certificates \
#    && rm -rf /var/lib/apt/lists/*
#
## Copy package files
#COPY package.json package-lock.json* ./
#
## Install dependencies
## --frozen-lockfile ensures deterministic builds
## --prefer-offline speeds up builds by using npm cache
#RUN npm ci --frozen-lockfile --prefer-offline
#
## ============================================
## Stage 2: Builder
## ============================================
## Build the Next.js application
#FROM node:24.9-slim AS builder
#
#WORKDIR /app
#
## Copy dependencies from deps stage
#COPY --from=deps /app/node_modules ./node_modules
#
## Copy application source code
#COPY . .
#
## Set environment to production
#ENV NODE_ENV=production
#
## Build arguments for build-time configuration
## These can be passed during docker build with --build-arg
#ARG NEXT_PUBLIC_API_BASE_URL
#ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
#
## Disable Next.js telemetry during build
#ENV NEXT_TELEMETRY_DISABLED=1
#
## Build the application
## Next.js will automatically detect standalone mode from next.config.ts
#RUN npm run build
#
## ============================================
## Stage 3: Runner (Production)
## ============================================
## Create the final, minimal production image
#FROM node:24.9-slim AS runner
#
#WORKDIR /app
#
## Set environment to production
#ENV NODE_ENV=production
#
## Disable Next.js telemetry in production
#ENV NEXT_TELEMETRY_DISABLED=1
#
## Create a non-root user and group for security
## nextjs user with UID 1001
#RUN groupadd --system --gid 1001 nodejs && \
#    useradd --system --uid 1001 --gid nodejs nextjs
#
## Copy only the necessary files for production
#
## Copy public assets
#COPY --from=builder /app/public ./public
#
## Set correct permissions for prerender cache
#RUN mkdir .next && \
#    chown nextjs:nodejs .next
#
## Copy standalone build output
## Next.js standalone mode includes only necessary files
#COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#
## Copy translations
#COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages
#
## Switch to non-root user
#USER nextjs
#
## Expose the port the app runs on
## Default Next.js port is 3000
#EXPOSE 3000
#
## Set default port (can be overridden by environment variable)
#ENV PORT=3000
#ENV HOSTNAME="0.0.0.0"
#
## Health check to ensure container is running properly
## Checks if the app responds on the health endpoint
#HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
#    CMD node -e "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
#
## Start the application
## Use node directly instead of npm for better signal handling
#CMD ["node", "server.js"]

# syntax=docker.io/docker/dockerfile:1

FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json ./
COPY package-lock.json ./
RUN npm ci


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Build arguments for build-time configuration
# These can be passed during docker build with --build-arg
ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]