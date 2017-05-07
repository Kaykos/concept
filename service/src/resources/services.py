# -*- coding: utf-8 -*-
import logging

import wtforms_json
from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource, fields, marshal_with

from db_manager import DbManager
from forms import ServiceCreateForm, ServiceDeleteForm
from models import Service
from resources import APIError

errors = {
  'IncompleteInformation': {
    'message': u'Datos incompletos'
  },
  'ServiceDoesNotExist': {
    'message': u'El servicio no existe'
  }
}

# Excepciones
class IncompleteInformation(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

class ServiceDoesNotExist(APIError):
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
  'name': fields.String,
  'rating': fields.Integer,
  'latitude': fields.Float,
  'longitude': fields.Float,
  'phone': fields.String,
  'address': fields.String
}


# Servicios de servicios
class Services(Resource):
  """
  Servicios de servicios
  """

  def get(self, type=None):
    """
    Obtener servicios. Si se recibe type se retornan los servicios de ese tipo
    :param user_id: 
    :param type: 
    :return: 
    """
    session = DbManager.get_database_session()
    if type:
      services = session.query(Service).filter_by(type=type).all()
    else:
      services = session.query(Service).order_by(Service.id).all()

    session.close()

    services_list = list()
    for service in services:
      services_list.append(service.to_dict())

    logging.info(u'Returned all services')
    return jsonify(services_list)

class ServicesByUser(Resource):
  """
  Servicios de servicios por usuario
  """
  def get(self, user_id):
    """
    Obtener los servicios creados por un usuario
    :param user_id: 
    :return: 
    """
    session = DbManager.get_database_session()
    services = session.query(Service).filter_by(provider_id=user_id).all()
    session.close()

    services_list = list()
    for service in services:
      services_list.append(service.to_dict())

    logging.info(u'Returned services of user: {}'.format(user_id))
    return jsonify(services_list)

  def post(self, user_id):
    """
    Crear un servicio
    :return:
    """

    # Validar los campos de la solicitud
    wtforms_json.init()
    form = ServiceCreateForm.from_json(request.json)
    form.provider_id = user_id
    """
    if not form.validate():
      raise IncompleteInformation
    """

    # Crear un nuevo servicio
    service = Service(
      provider_id=user_id,
      cost=form.cost.data,
      description=form.description.data,
      type=form.type.data,
      name=form.name.data,
      rating=0,
      phone=form.phone.data,
      address=form.address.data
    )

    if form.type.data == 'locacion':
      service.latitude = form.latitude.data
      service.longitude = form.longitude.data

    # Actualizar en la base de datos
    session = DbManager.get_database_session()
    session.add(service)
    session.commit()
    session.close()

    logging.info(u'Created service for user: {}'.format(user_id))
    return jsonify(service.to_dict())

  def put(self, user_id, service_id):
    """
    Actualizar la información de un servicio
    :param usuario_id: 
    :return: 
    """

    wtforms_json.init()
    form = ServiceDeleteForm.from_json(request.json)
    form.provider_id.data = user_id
    form.id.data = service_id
    if not form.validate():
      raise IncompleteInformation

    session = DbManager.get_database_session()
    service = session.query(Service).filter_by(id=service_id).first()

    service.update(request.json)
    session.commit()
    session.close()

    logging.info(u'Updated service: {}'.format(service_id))
    return jsonify(service.to_dict())

  def delete(self, user_id, service_id):
    """
    Eliminar un servicio
    :param usuario_id: 
    :return: 
    """
    wtforms_json.init()
    form = ServiceDeleteForm.from_json(request.json)
    form.provider_id.data = user_id
    form.id.data = service_id

    if not form.validate():
      raise IncompleteInformation

    session = DbManager.get_database_session()
    service = session.query(Service).filter_by(id=service_id).first()
    session.delete(service)
    session.commit()
    logging.info(u'Deleted service: {}'.format(service_id))
    return

api.add_resource(Services, '/api/services', '/api/services/<string:type>')
api.add_resource(ServicesByUser, '/api/users/<int:user_id>/services', '/api/users/<int:user_id>/services/<int:service_id>')