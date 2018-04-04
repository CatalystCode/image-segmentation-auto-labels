from ast import literal_eval
from os import getenv


MASK_COLOR = literal_eval(getenv('MASK_COLOR'))
OUTPUT_IMAGE_FORMAT = getenv('OUTPUT_IMAGE_FORMAT')
