#!/bin/bash
# https://docs.docker.com/engine/install/linux-postinstall/

echo "post-install process for docker"

sudo usermod -aG docker ${1} # Add user to docker group. This might not work in some ubuntu version.