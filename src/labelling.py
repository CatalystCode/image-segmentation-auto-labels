from inspect import getmembers
from inspect import isfunction

import hug
from hug_middleware_cors import CORSMiddleware

from constants import MASK_COLOR
from constants import OUTPUT_IMAGE_FORMAT
from image_io import load_image
from image_io import serialize_image
from image_processing import apply_morphology
import image_masking

api = hug.API(__name__)
api.http.add_middleware(CORSMiddleware(api))


@hug.type(extend=hug.types.text)
def image_mask_algorithm_type(value):
    """The masking algorithm to use for image pre-labelling."""

    try:
        value = getattr(image_masking, value)
    except AttributeError:
        raise ValueError('Unknown masking algorithm: {}'.format(value))
    else:
        return value


@hug.get('/algorithms')
@hug.cli()
def list_algorithms():
    return [name for (name, _) in getmembers(image_masking, isfunction)
            if not name.startswith('_')]


@hug.get('/mask')
@hug.cli()
def get_mask(image_path: hug.types.text,
             algorithm: image_mask_algorithm_type,
             morph: hug.types.number=1):

    image_rgb = load_image(image_path)

    mask = algorithm(image_rgb)

    if morph > 0:
        mask = apply_morphology(mask, iterations=morph)

    image_rgb[mask == 0] = MASK_COLOR

    serialized = serialize_image(image_rgb, OUTPUT_IMAGE_FORMAT)

    return {
        'type': 'image/{}'.format(OUTPUT_IMAGE_FORMAT),
        'encoding': 'base64',
        'content': serialized
    }
