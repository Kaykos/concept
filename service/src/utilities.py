# -*- coding: utf-8 -*-
import json

class Utilities():
  """
  Clase con métodos de utilidades
  """

  @staticmethod
  def is_email(user_id):
    """
    Verificar si el id recibido es un email
    :param user_id: 
    :return: 
    """
    return '@' in user_id
