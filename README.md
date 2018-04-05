# image-segmentation-auto-labels

## What's this?

This repository contains a Python application that can be used to quickly
generate labelled data for image segmentation tasks. The application can be
run as a web service or command line tool and supports a number of algorithms
to generate candidate image masks.

More detail on the approaches implemented in this repository is available in
the companion Azure Notebook: [Using Otsu's method to pre-label training data for image segmentation](https://notebooks.azure.com/clewolff/libraries/otsu/html/otsu.ipynb).

## Usage

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

![Screenshot of auto-labelling service test page](https://user-images.githubusercontent.com/1086421/38383640-09990032-38db-11e8-9911-6ee8f4e8287e.png)
