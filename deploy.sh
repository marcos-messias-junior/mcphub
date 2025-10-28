#!/bin/bash

docker build -t marcosmessias/mcphub:0.10.0 -f ./Dockerfile . &&
docker push marcosmessias/mcphub:0.10.0