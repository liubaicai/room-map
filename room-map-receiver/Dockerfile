FROM node:14-stretch-slim as builder

WORKDIR /app
COPY . /app
RUN npm ci && npm run build

FROM node:14-stretch-slim

WORKDIR /app
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/dist/ /app/dist/
RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/main.js"]
