# --------------------
#       build
# --------------------
FROM node:16.9.0-stretch as build
WORKDIR /back
COPY package.json yarn.lock ./
RUN yarn install
COPY src ./src

# --------------------
#       prod
# --------------------
FROM build as prod
CMD ["yarn", "start"]
