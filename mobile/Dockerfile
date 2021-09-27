# --------------------
#       build
# --------------------
FROM node:16.9.0-stretch as build
COPY package.json package-lock.lock ./
RUN yarn install
COPY . ./

# --------------------
#       test
# --------------------
FROM build as test
RUN yarn test
