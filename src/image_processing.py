import cv2
import numpy as np


def apply_morphology(mask, kernel=(10, 10), iterations=2):
    kernel = np.ones(kernel, np.uint8)

    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel,
                            iterations=iterations)

    return mask
