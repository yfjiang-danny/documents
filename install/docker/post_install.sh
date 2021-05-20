#!/bin/bash
# https://docs.docker.com/engine/install/linux-postinstall/

echo "post-install process for docker"

sudo usermod -aG docker ${1}