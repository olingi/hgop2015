#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt

# Check if Grunt failed and exit if it did, otherwise continue
rc=$?;
if [[ $rc != 0 ]];
    then
    echo Grunt Failed
    exit $rc;
fi

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t olingi/tictactoe .

echo "Done"
