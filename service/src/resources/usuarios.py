# -*- coding: utf-8 -*-
import logging

from models import User
from flask import Blueprint
from flask_restful import Api, Resource, fields, marshal_with
from resources import APIError

errors = {
  'UsuarioNoExiste': {
    'status': 404,
    'message': u'El usuario solicitado no fue encontrado',
    'error_code': 1
    #'extra': u'Any extra information you want.'
  }
}


class UsuarioNoExiste(APIError):

  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)


class SuscripcionNoExiste(APIError):

  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)


usuarios_bp = Blueprint('usuarios_api', __name__)
api = Api(usuarios_bp, errors=errors, catch_all_404s=True)

usuario_fields = {
  'id': fields.Integer,
  'nombres': fields.String,
  'apellidos': fields.String,
  'nombre_completo': fields.String
}


class Usuarios(Resource):

  @marshal_with(usuario_fields)
  def get(self, usuario_id=None):
    if usuario_id:
      usuario = User.get_by_id(usuario_id)
      if not usuario:
        raise UsuarioNoExiste(warn=u'No se encontro el usuario "{}"'.format(usuario_id))

      return usuario

    usuarios = User.query().fetch()
    return usuarios

  def post(self):
    logging.info('Usuarios post')

  def put(self, usuario_id):
    logging.info('Usuarios put: {}'.format(usuario_id))

  def delete(self, usuario_id):
    logging.info('Usuarios delete: {}'.format(usuario_id))

api.add_resource(Usuarios, '/usuarios', '/usuarios/<int:usuario_id>')
