#!/bin/bash

docker build --build-arg INSTALL_EXT=true -t marcosmessias/mcphub:0.12.07 -f ./Dockerfile . &&
docker push marcosmessias/mcphub:0.12.07