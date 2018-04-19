#!/usr/bin/env python3

from os.path import abspath
from os.path import dirname
from os.path import join
from os.path import realpath
from sys import path
from unittest import TestCase

root_dir = abspath(join(dirname(realpath(__file__)), '..'))
path.append(join(root_dir, 'src'))

import labelling  # noqa


class EndToEndTest(TestCase):
    algorithm = 'otsu_hue'

    def test_list_algorithms(self):
        algorithms = labelling.list_algorithms()

        self.assertGreater(len(algorithms), 0)
        self.assertIn(self.algorithm, algorithms)

    def test_create_mask(self):
        image = join(root_dir, 'test_image.jpg')
        algorithm = labelling.image_mask_algorithm_type(self.algorithm)
        morph = 0

        mask = labelling.create_mask(image, algorithm, morph)

        self.assertIn('content', mask)
        self.assertIn('type', mask)
        self.assertIn('encoding', mask)


if __name__ == '__main__':
    from unittest import main
    main(verbosity=2)
