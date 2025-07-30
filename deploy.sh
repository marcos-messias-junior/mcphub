#!/bin/bash

docker build -t marcosmessias/mcphub:0.8.6 -f ./Dockerfile . &&
docker push marcosmessias/mcphub:0.8.6