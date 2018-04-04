# image-segmentation-auto-labels

## What's this?

This repository contains a Python application that can be used to quickly
generate labelled data for image segmentation tasks. The application can be
run as a web service or command line tool and supports a number of algorithms
to generate candidate image masks.

More detail on the approaches implemented in this repository is available in
the companion Azure Notebook: [Using Otsu's method to pre-label training data for image segmentation](https://notebooks.azure.com/clewolff/libraries/otsu/html/otsu.ipynb).

## Usage

First, build and run the auto-labelling service via docker:

```sh
docker-compose up --build
```

This will start the auto-labelling service on port 8080. You can use the [test page](https://catalystcode.github.io/image-segmentation-auto-labels/)
to experiment with the service.
