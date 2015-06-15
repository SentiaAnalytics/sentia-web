#!/bin/bash
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
