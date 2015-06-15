#!/bin/bash
#install
echo $GCLOUD_CREDENTIALS >> gcloud.json
sudo google-cloud-sdk/bin/gcloud -q auth activate-service-account --key-file ./gcloud.json
sudo google-cloud-sdk/bin/gcloud config set project sentia-analytics
sudo google-cloud-sdk/bin/gcloud config set compute/zone europe-west1-b
sudo google-cloud-sdk/bin/gcloud config set container/cluster web-cluster
sudo google-cloud-sdk/bin/gcloud alpha container get-credentials
