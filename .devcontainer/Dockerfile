#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

# To fully customize the contents of this image, use the following Dockerfile instead:
# https://github.com/microsoft/vscode-dev-containers/tree/v0.117.1/containers/ubuntu-18.04-git/.devcontainer/Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/base:0-ubuntu-18.04

ENV DEBIAN_FRONTEND=noninteractive \
    NODE_VERSION=11 \
    NPM_VERSION=6.4.1 \
    PANDOC_GITHUB_RELEASE=2.9.2 \
    PANDOC_CROSSREF_RELEASE=v0.3.6.2 \
    PANDOC_CROSSREF_FILE_RELEASE=2_9_2 \
    PDFTK_VERSION=2.02 \
    DEBIAN_FRONTEND=noninteractive

# Basic tools
RUN apt-get update \
    && apt-get install curl wget build-essential file git -y \
    && rm -rf /var/lib/apt/list/*

# Latex
RUN apt-get update \
    && apt-get install texlive-full -y \
    && rm -rf /var/lib/apt/lists/*

# Pandoc with citeproc
RUN wget https://github.com/jgm/pandoc/releases/download/"${PANDOC_GITHUB_RELEASE}"/pandoc-"${PANDOC_GITHUB_RELEASE}"-1-amd64.deb \
    && dpkg -i pandoc-"${PANDOC_GITHUB_RELEASE}"-1-amd64.deb \
    && rm pandoc-"${PANDOC_GITHUB_RELEASE}"-1-amd64.deb

# Pandoc crossref
RUN wget https://github.com/lierdakil/pandoc-crossref/releases/download/"${PANDOC_CROSSREF_RELEASE}"/linux-pandoc_"${PANDOC_CROSSREF_FILE_RELEASE}".tar.gz \
    && tar -zxvf linux-pandoc_"${PANDOC_CROSSREF_FILE_RELEASE}".tar.gz \
    && chmod +x pandoc-crossref pandoc-crossref.1 \
    && mv pandoc-crossref pandoc-crossref.1 /usr/bin/

# Install Node
RUN apt-get update \
    && curl -sL https://deb.nodesource.com/setup_"${NODE_VERSION}".x | bash \
    && apt-get install -y nodejs \
    && npm install -g npm@"$NPM_VERSION" \
    && rm -rf /var/lib/apt/lists/*