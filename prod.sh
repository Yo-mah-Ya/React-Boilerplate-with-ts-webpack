#!/usr/bin/env bash

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}

config='--config webpack.prod.js'

case "$1" in
    "build") yarn build ${config};;
    "start") yarn start ${config};;
    "test") yarn test $2;;
    *) echo "Bad args: $1"
esac
