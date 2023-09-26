#!/bin/bash

echo "post-install process for golang"

cat .path.env >> ~/.bashrc

mkdir ~/go
mkdir ~/.config/go
cat .env > ~/.config/go/env
