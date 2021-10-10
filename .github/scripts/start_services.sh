#!/bin/bash
source "$(dirname "${BASH_SOURCE[0]}")/init.sh"

docker-compose build
docker-compose up -d
docker-compose ps -a
