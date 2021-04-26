# STAGE 1: Build project
FROM node:alpine as builder
RUN apk add python make gcc g++

# Install project dependencies
WORKDIR /app
COPY package* .
RUN npm ci

# Build project
COPY .babelrc.* ./
COPY webpack.config.js webpack.config.js
COPY src/ src/
RUN npm run build


# STAGE 2: Run Project
FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist dist
COPY package* .
RUN npm i --production

CMD ["npm", "start"]
EXPOSE 3000
