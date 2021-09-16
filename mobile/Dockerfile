# --------------------
#       build
# --------------------
FROM node:16.9.0-stretch as build
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./

# --------------------
#       test
# --------------------
FROM build as test
RUN yarn test

## --------------------
##       prod
## --------------------
#FROM build as prod
#ARG KEYSTORE
#ARG EXPO_CLI_PASSWORD
#RUN if [ -z ${KEYSTORE+x} ]; \
#        then echo "KEYSTORE is unset" && exit; \
#    fi; \
#    echo "$KEYSTORE" > /tmp/keystore.jks && \
#    yarn expo login -u $EXPO_USERNAME
#    yarn expo build:android -t app-bundle --no-wait --keystore-path /tmp/keystore.jks
