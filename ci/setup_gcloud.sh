#!/bin/bash
#install
echo $GCLOUD_CREDENTIALS
echo $GCLOUD_CREDENTIALS >> gcloud.json
cat gcloud.json
wget https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.zip
unzip google-cloud-sdk.zip
rm google-cloud-sdk.zip
sudo google-cloud-sdk/install.sh \
  --usage-reporting=true \
  --path-update=true \
  --bash-completion=true \
  --rc-path=/.bashrc \
  --disable-installation-options
sudo google-cloud-sdk/bin/gcloud --quiet components update  preview  alpha  beta  app
sudo google-cloud-sdk/bin/gcloud -q auth activate-service-account --key-file ./gcloud.json
sudo google-cloud-sdk/bin/gcloud config set project sentia-analytics
sudo google-cloud-sdk/bin/gcloud config set compute/zone europe-west1-b
sudo google-cloud-sdk/bin/gcloud config set container/cluster web-cluster
sudo google-cloud-sdk/bin/gcloud alpha container get-credentials
