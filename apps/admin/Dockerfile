FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy all package files for monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/database/package.json ./packages/database/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/
COPY apps/admin/package.json ./apps/admin/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm in builder stage
RUN npm install -g pnpm@latest

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps/admin/node_modules ./apps/admin/node_modules

# Copy source files
COPY . .

# Build the project
WORKDIR /app/apps/admin
RUN pnpm build

# Production image, copy all the files and run
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Install pnpm in runner stage
RUN npm install -g pnpm@latest

# Copy runtime dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/admin/node_modules ./apps/admin/node_modules
COPY --from=builder /app/apps/admin/package.json ./apps/admin/
COPY --from=builder /app/apps/admin/public ./apps/admin/public
COPY --from=builder /app/apps/admin/.next ./apps/admin/.next

WORKDIR /app/apps/admin

# Expose the application port
EXPOSE 3002

# Run the application using pnpm
CMD ["pnpm", "start"] 