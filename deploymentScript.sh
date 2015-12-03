#!/bin/bash

# push new image to docker
echo pushing image to docker
docker push olingi/tictactoe

echo setting up vagrant server
ssh vagrant@192.168.33.10 'bash -s' < docker-reload.sh
