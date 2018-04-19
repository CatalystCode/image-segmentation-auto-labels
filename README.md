# image-segmentation-auto-labels

[![CI status](https://travis-ci.org/CatalystCode/image-segmentation-auto-labels.svg?branch=master)](https://travis-ci.org/CatalystCode/image-segmentation-auto-labels)
[![Docker status](https://img.shields.io/docker/pulls/cwolff/image_segmentation_auto_labels.svg)](https://hub.docker.com/r/cwolff/image_segmentation_auto_labels/)

## What's this?

This repository contains a Python application that can be used to quickly
generate labelled data for image segmentation tasks. The application can be
run as a web service or command line tool and supports a number of algorithms
to generate candidate image masks.

More detail on the approaches implemented in this repository is available in
the companion Azure Notebook: [Using Otsu's method to pre-label training data for image segmentation](https://notebooks.azure.com/clewolff/libraries/otsu/html/otsu.ipynb).

## Usage

### As a web service

Pull and run the auto-labelling service via docker:

```sh
docker run -p 8080:80 cwolff/image_segmentation_auto_labels
```

This will start the auto-labelling service on port 8080. There are two main
routes in the service:

```sh
# fetch a list of supported image masking algorithms
curl 'http://localhost:8080/algorithms'

# generate a mask for an image using the provided masking algorithm
curl 'http://localhost:8080/mask' -H 'Content-Type: application/json' -d '
{
  "image_path": "/data/test_image.jpg",
  "algorithm": "otsu_hue",
  "morph": 0
}'
```

You can use the [test page](https://catalystcode.github.io/image-segmentation-auto-labels/)
to interactively experiment with the service.

![Screenshot of auto-labelling service test page](https://user-images.githubusercontent.com/1086421/38619525-520268ac-3d6a-11e8-8eb8-80e752dcb2af.png)

### As a command line tool

Pull and run the auto-labelling tool via docker:

```sh
# fetch a list of supported image masking algorithms
docker run cwolff/image_segmentation_auto_labels /do list_algorithms

# generate a mask for an image using the provided masking algorithm
docker run cwolff/image_segmentation_auto_labels /do create_mask "/data/test_image.jpg" "otsu_hue" "0"
```
