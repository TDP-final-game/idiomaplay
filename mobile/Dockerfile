# --------------------
#       build
# --------------------
FROM node:16.9.0-stretch as build
WORKDIR /mobile
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./

# --------------------
#       test
# --------------------
FROM build as test
RUN npm test
