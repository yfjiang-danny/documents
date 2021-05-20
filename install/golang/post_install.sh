#!/bin/bash

echo "post-install process for golang"

cat .path >> ~/.bashrc

mkdir ~/go
mkdir ~/.config/go
cat .env > ~/.config/go/env

echo "Change <username> to your username in ~/.config/go/env, otherwise the go env config won't work properly"