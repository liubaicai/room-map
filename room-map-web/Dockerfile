FROM node:10-alpine

WORKDIR /app
COPY package*.json ./

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

ENV NODE_ENV=production
ENV HOST 0.0.0.0

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]
