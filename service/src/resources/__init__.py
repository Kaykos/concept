# -*- coding: utf-8 -*-
import logging


class APIError(Exception):
  """
  Error general para retornar como respuesta
  """
  def __init__(self, *args, **kwargs):
    self.warn = kwargs.pop('warn', None)
    self.error = kwargs.pop('error', None)
    super(APIError, self).__init__(*args, **kwargs)

    if self.warn:
      logging.warning('{}: {}'.format(self.__class__.__name__, self.warn))
    if self.error:
      logging.error('{}: {}'.format(self.__class__.__name__, self.error))


class ResourceDoesNotExist(APIError):

  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)
