import cv2
import numpy as np


def otsu_grayscale(image_rgb):
    image_gray = cv2.cvtColor(image_rgb, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(image_gray, 0, 255,
                            cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return mask


def _otsu_hsl(image_rgb, channel_name, flip):
    image_gray = cv2.cvtColor(image_rgb, cv2.COLOR_BGR2HLS)
    hue, lightness, saturation = np.split(image_gray, 3, axis=2)

    hsl = locals()[channel_name]
    hsl = hsl.reshape((hsl.shape[0], hsl.shape[1]))

    _, mask = cv2.threshold(hsl, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    if flip:
        mask = ~mask

    return mask


def otsu_hue(image_rgb):
    return _otsu_hsl(image_rgb, channel_name='hue', flip=True)


def otsu_saturation(image_rgb):
    return _otsu_hsl(image_rgb, channel_name='saturation', flip=True)


def otsu_lightness(image_rgb):
    return _otsu_hsl(image_rgb, channel_name='lightness', flip=False)
