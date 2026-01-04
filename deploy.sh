#!/bin/bash

docker build --build-arg INSTALL_EXT=true -t marcosmessias/mcphub:0.11.10 -f ./Dockerfile . &&
docker push marcosmessias/mcphub:0.11.10