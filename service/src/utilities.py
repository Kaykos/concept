# -*- coding: utf-8 -*-
import json

from flask import jsonify


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

  @staticmethod
  def object_to_json(return_object):
    """
    Retornar un objeto como JSON
    :param return_object: 
    :return: 
    """
    return jsonify(return_object.to_dict())

  @staticmethod
  def list_to_json(objects_list):
    """
    Retornar una lista de objetos como JSON
    :param objects_list: 
    :return: 
    """
    return_list = list()
    for item in objects_list:
      return_list.append(item.to_dict())
    return jsonify(return_list)
