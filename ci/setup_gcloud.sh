#!/bin/bash
#install
wget https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.zip
unzip google-cloud-sdk.zip
rm google-cloud-sdk.zip
sudo google-cloud-sdk/install.sh \
  --usage-reporting=true \
  --path-update=true \
  --bash-completion=true \
  --rc-path=/.bashrc \
  --disable-installation-options

alias gcloud=google-cloud-sdk/bin/gcloud
sudo gcloud --quiet components update  preview  alpha  beta  app

#config
$GCLOUD_CREDENTIALS >> gcloud.json
sudo gcloud -q auth activate-service-account --key-file gcloud.json
sudo gcloud config set project sentia-analytics
sudo gcloud config set compute/zone europe-west1-b
sudo gcloud config set container/cluster web-cluster
sudo gcloud alpha container get-credentials
