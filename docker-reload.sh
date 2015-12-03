#!/bin/bash

# Kill the docker process
docker kill tictactoe
# remove the process resources
docker rm tictactoe
# pull new version of olingi/tictactoe
docker pull olingi/tictactoe
# run new instance of project on port 80
docker run --name="tictactoe" -p 80:8080 -d -e "NODE_ENV=production" olingi/tictactoe

touch Benni.txt
