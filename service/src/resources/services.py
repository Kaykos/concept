# -*- coding: utf-8 -*-
import logging

import wtforms_json
from flask import Blueprint, request
from flask_restful import Api, Resource, fields, marshal_with

from db_manager import DbManager
from forms import ServiceCreateForm
from models import Service
from resources import APIError

errors = {
  'IncompleteInformation': {
    'message': u'Incomplete information'
  }
}

# Excepciones
class IncompleteInformation(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

# Creación del blueprint
services_bp = Blueprint('services_api', __name__)
api = Api(services_bp, errors=errors, catch_all_404s=True)

# Campos para retornar
service_fields = {
  'id': fields.Integer,
  'provider_id': fields.Integer,
  'cost': fields.Integer,
  'description': fields.String,
  'type': fields.String,
  'name': fields.String
}


# Servicios de servicios
class Services(Resource):
  """
  Servicios de servicios
  """

  @marshal_with(service_fields)
  def get(self, user_id=None, type=None):
    """
    Obtener servicios. Si se recibe user_id se retornan los servicios creados por
    ese usuario. Si se recibe type se retornan los servicios de ese tipo
    :param user_id: 
    :param type: 
    :return: 
    """
    session = DbManager.get_database_session()
    if user_id:
      services = session.query(Service).filter_by(provider_id=user_id).all()
    if type:
      services = session.query(Service).filter_by(type=type).all()
    if not user_id and not type:
      services = session.query(Service).order_by(Service.id).order_by(Service.provider_id).all()

    session.close()
    return services

  @marshal_with(service_fields)
  def post(self):
    """
    Crear un servicio
    :return:
    """
    # Validar los campos de la solicitud
    wtforms_json.init()
    form = ServiceCreateForm.from_json(request.json)
    if not form.validate():
      raise IncompleteInformation

    # Crear un nuevo servicio
    service = Service(
      provider_id=form.provider_id.data,
      cost=form.cost.data,
      description=form.description.data,
      type=form.type.data,
      name=form.name.data
    )

    # Actualizar en la base de datos
    session = DbManager.get_database_session()
    session.add(service)
    session.commit()
    session.close()

    return service

  def put(self, usuario_id):
    logging.info('Usuarios put: {}'.format(usuario_id))

  def delete(self, usuario_id):
    logging.info('Usuarios delete: {}'.format(usuario_id))


api.add_resource(Services, '/api/services', '/api/services/<int:user_id>', '/api/services/<string:type>')
