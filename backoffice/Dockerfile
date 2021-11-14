# --------------------
#       build
# --------------------
FROM node:16.10.0-stretch as build
WORKDIR /backoffice
COPY package.json yarn.lock ./
RUN yarn install
COPY src ./src
COPY public ./public
RUN yarn build

# --------------------
#       prod
# --------------------
FROM node:16.10.0-stretch as prod
WORKDIR /backoffice
RUN yarn global add serve runtime-env-cra
COPY serve.json serve.json
COPY .env.example .env
COPY --from=build /backoffice/build /backoffice
CMD ["/bin/sh", "-c", "runtime-env-cra && serve"]
