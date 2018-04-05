#!/usr/bin/env python3

from ast import literal_eval
from getpass import getuser
from os import getenv
from os.path import abspath
from os.path import dirname
from os.path import join
from os.path import realpath
from subprocess import check_output
from sys import stdout
from unittest import TestCase


DOCKER_CONTEXT = abspath(join(dirname(realpath(__file__)), '..'))
DOCKER_USERNAME = getenv('DOCKER_USERNAME', getuser())
DOCKER_IMAGE_NAME = 'image_segmentation_auto_labels'
DOCKER_TAG = '{}/{}:latest'.format(DOCKER_USERNAME, DOCKER_IMAGE_NAME)
DEFAULT_ALGORITHM = 'otsu_hue'


def run_command(args):
    return check_output(args, shell=True).decode(stdout.encoding)


def docker_do(args):
    return run_command(['docker', 'run', DOCKER_TAG, '/do'] + args)


class EndToEndTest(TestCase):
    @classmethod
    def setUpClass(cls):
        run_command(['docker', 'build', '--tag', DOCKER_TAG, DOCKER_CONTEXT])

    def test_list_algorithms(self):
        algorithms = docker_do(['list_algorithms'])
        algorithms = literal_eval(algorithms)

        self.assertGreater(len(algorithms), 0)
        self.assertIn(DEFAULT_ALGORITHM, algorithms)

    def test_create_mask(self):
        image = '/data/test_image.jpg'
        algorithm = DEFAULT_ALGORITHM
        morph = '0'

        mask = docker_do(['create_mask', image, algorithm, morph])
        mask = literal_eval(mask)

        self.assertIn('content', mask)
        self.assertIn('type', mask)
        self.assertIn('encoding', mask)


if __name__ == '__main__':
    from unittest import main
    main(verbosity=2)
