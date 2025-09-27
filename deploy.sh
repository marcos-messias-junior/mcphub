#!/bin/bash

docker build -t marcosmessias/mcphub:0.9.1 -f ./Dockerfile . &&
docker push marcosmessias/mcphub:0.9.1