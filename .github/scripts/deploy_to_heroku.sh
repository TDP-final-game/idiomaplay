#!/bin/bash
source "$(dirname "${BASH_SOURCE[0]}")/init.sh"

# Check required vars
check_vars \
  SERVICE \
  IMAGE_NAME IMAGE_VERSION \
  REGISTRY_URL REGISTRY_USERNAME REGISTRY_PASSWORD

# Login to docker registry
echo "$REGISTRY_PASSWORD" | docker login "$REGISTRY_URL" -u "$REGISTRY_USERNAME" --password-stdin

# Login to heroku registry
echo "$HEROKU_API_KEY" | docker login registry.heroku.com -u _ --password-stdin

# Pull image
docker pull "$IMAGE_NAME:$IMAGE_VERSION"

# Tag image for heroku
docker tag "$IMAGE_NAME:$IMAGE_VERSION" registry.heroku.com/idiomaplay/web

# Push image
docker push registry.heroku.com/idiomaplay/web

# Get image id
IMAGE_ID=$(docker inspect my_image --format='{{.Id}}')

# Release
curl --netrc -X PATCH https://api.heroku.com/apps/idiomaplay/formation \
  -d "{
  \"updates\": [
    {
      \"type\": \"web\",
      \"docker_image\": \"$IMAGE_ID\"
    }
  ]
}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3.docker-releases"
