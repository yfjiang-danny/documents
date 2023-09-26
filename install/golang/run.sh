#!/bin/bash

echo "setup golang"

wget https://studygolang.com/dl/golang/go1.14.4.linux-amd64.tar.gz # Change version url
sudo tar -xzf go1.14.4.linux-amd64.tar.gz -C /opt # Unzip to /opt/go - this is the go root path.
