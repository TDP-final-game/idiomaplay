#!/bin/bash
source "$(dirname "${BASH_SOURCE[0]}")/init.sh"

# Check required vars
check_vars \
  SERVICE \
  IMAGE_NAME IMAGE_VERSION \
  REGISTRY_URL REGISTRY_USERNAME REGISTRY_PASSWORD

# Build image
docker build "$SERVICE" -t "$IMAGE_NAME:latest" --target=prod

# Tag image
docker tag "$IMAGE_NAME:latest" "$IMAGE_NAME:$IMAGE_VERSION"

# Login to docker registry
echo "$REGISTRY_PASSWORD" | docker login "$REGISTRY_URL" -u "$REGISTRY_USERNAME" --password-stdin

# Push image
docker push "$IMAGE_NAME:$IMAGE_VERSION"
docker push "$IMAGE_NAME:latest"
