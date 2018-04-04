from base64 import b64encode
from urllib.request import urlopen

import cv2
import numpy as np


def load_image(image_path):
    if image_path.startswith('http://') or image_path.startswith('https://'):
        image = urlopen(image_path).read()
        image = np.asarray(bytearray(image), dtype=np.uint8)
        image = cv2.imdecode(image, -1)
    else:
        image = cv2.imread(image_path)

    return image


def serialize_image(image_rgb, image_type):
    _, image_jpg = cv2.imencode('.{}'.format(image_type), image_rgb)
    image_encoded = b64encode(image_jpg)
    return image_encoded
