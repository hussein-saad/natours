# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build:js

# Production stage
FROM node:18-alpine AS production

WORKDIR /app
RUN  chown -R node:node /app

ENV NODE_ENV=production


USER node

COPY --from=build --chown=node:node /app/package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=build --chown=node:node /app/app.js ./
COPY --from=build --chown=node:node /app/server.js ./
COPY --from=build --chown=node:node /app/controllers ./controllers
COPY --from=build --chown=node:node /app/models ./models
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/routes ./routes
COPY --from=build --chown=node:node /app/utils ./utils
COPY --from=build --chown=node:node /app/views ./views
COPY --from=build --chown=node:node /app/dev-data ./dev-data

EXPOSE 3000

CMD ["npm", "start"]