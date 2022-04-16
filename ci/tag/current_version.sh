#!/usr/bin/env bash

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-0}) && pwd)

cd ${SOURCE_DIR}

# set -eu

current_version=$(git tag -l --sort=v:refname | tail -n1)
current_version_number=$(echo ${current_version} | sed "s/^v//")
if [ -z "${current_version_number}" ] ; then
	current_version_number="0.0.0"
fi
current_version="v${current_version_number}"

echo ${current_version}
