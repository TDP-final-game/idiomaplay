#!/bin/bash
source "$(dirname "${BASH_SOURCE[0]}")/init.sh"

check_vars SERVICE

docker build "$SERVICE" --target=test
