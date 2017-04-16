# -*- coding: utf-8 -*-
import logging

from models import Service
from flask import Blueprint
from flask_restful import Api, Resource, fields, marshal_with

errors = {
  'ServicioNoExiste': {
    'status': 404,
    'message': u'El servicio solicitado no fue encontrado',
    'error_code': 1
    #'extra': u'Any extra information you want.'
  }
}

#Creación del blueprint
services_bp = Blueprint('services_api', __name__)
api = Api(services_bp, errors=errors, catch_all_404s=True)

#Campos para retornar
service_fields = {
  'id': fields.Integer,
  'provider_id': fields.Integer,
  'cost': fields.Integer,
  'description': fields.String,
  'type': fields.String,
  'name': fields.String
}


test_services = [{'id':1, 'description':'El primer servicio de prueba', 'cost': 5000},
                 {'id':2, 'description':'El segundo servicio de prueba', 'cost': 1000}]

#Servicios de servicios
class Services(Resource):
  """
  Servicios de servicios
  """
  @marshal_with(service_fields)
  def get(self, user_id=None):
    return test_services

  def post(self):
    logging.info('Usuarios post')

  def put(self, usuario_id):
    logging.info('Usuarios put: {}'.format(usuario_id))

  def delete(self, usuario_id):
    logging.info('Usuarios delete: {}'.format(usuario_id))

api.add_resource(Services, '/api/services', '/api/services/<int:user_id>')
