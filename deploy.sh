#!/bin/bash

docker build -t marcosmessias/mcphub:0.11.9 -f ./Dockerfile . &&
docker push marcosmessias/mcphub:0.11.9