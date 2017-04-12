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

services_bp = Blueprint('services_api', __name__)
api = Api(services_bp, errors=errors, catch_all_404s=True)

service_fields = {
  'id': fields.Integer,
  'description': fields.String,
  'cost': fields.Integer,
}


test_services = [{'id':1, 'description':'El primer servicio de prueba', 'cost': 5000},
                 {'id':2, 'description':'El segundo servicio de prueba', 'cost': 1000}]

class Services(Resource):

  @marshal_with(service_fields)
  def get(self, service_id=None):
    if service_id:
      service = Service.get_by_id(service_id)
      if not service:
        #raise UsuarioNoExiste(warn=u'No se encontro el usuario "{}"'.format(usuario_id))
        pass

      return service

    #term = request.args.get('term')
    # if term: term
    # services = Service.query().fetch()
    return test_services

  def post(self):
    logging.info('Usuarios post')

  def put(self, usuario_id):
    logging.info('Usuarios put: {}'.format(usuario_id))

  def delete(self, usuario_id):
    logging.info('Usuarios delete: {}'.format(usuario_id))

api.add_resource(Services, '/api/services', '/api/services/<int:service_id>')
