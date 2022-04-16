#!/usr/bin/env bash
SOURCE_S3_BUCKET="your-bucket-name"
STACK_NAME="CloudFront-S3-APIGateway-Lambda"

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}


FRONTEND_SOURCE_BUCKET=""

aws cloudformation package \
    --template-file template.yml \
    --s3-bucket ${SOURCE_S3_BUCKET} \
    --output-template-file packaged_template.yml


aws cloudformation deploy \
    --template-file packaged_template.yml \
    --stack-name ${STACK_NAME} \
    --parameter-overrides \
        APIGatewayStageName=prod \
        bucketName=${FRONTEND_SOURCE_BUCKET} \
    --capabilities CAPABILITY_NAMED_IAM
