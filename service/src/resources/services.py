# -*- coding: utf-8 -*-
import logging

import wtforms_json
from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from sqlalchemy.orm import load_only

from db_manager import DbManager
from forms import ServiceCreateForm, ServiceDeleteForm, ServiceUpdateForm
from models import Service, Event, EventsHaveServices
from resources import APIError
from utilities import Utilities

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
      if '-' in type:
        from datetime import datetime
        search_date = datetime.strptime(type, '%Y-%m-%d')
        services = session.query(Service).order_by(Service.id).all()
        unavailable_services = session.query(EventsHaveServices).filter_by(date=search_date).all()

        for event_service in unavailable_services:
          for service in services:
            if event_service.service_id == service.id:
              services.remove(service)

      else:
        services = session.query(Service).filter_by(type=type).all()
    else:
      services = session.query(Service).order_by(Service.id).all()

    logging.info(u'Returned all services')

    response = Utilities.list_to_json(services)
    session.close()

    return response


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

    logging.info(u'Returned services of user: {}'.format(user_id))

    response = Utilities.list_to_json(services)
    session.close()

    return response

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
    service =  Service(form)

    if form.type.data == u'establecimiento':
      service.latitude = form.latitude.data
      service.longitude = form.longitude.data

    # Actualizar en la base de datos
    session = DbManager.get_database_session()
    session.add(service)
    session.flush()

    if 'image_data' in request.json:
      service.update_image_url(request.json)

    session.commit()

    logging.info(u'Created service for user: {}'.format(user_id))

    response = Utilities.object_to_json(service)
    session.close()

    return response

  def put(self, user_id, service_id):
    """
    Actualizar la información de un servicio
    :param usuario_id: 
    :return: 
    """

    wtforms_json.init()
    form = ServiceUpdateForm.from_json(request.json)
    form.provider_id.data = user_id
    form.id.data = service_id
    if not form.validate():
      raise IncompleteInformation

    session = DbManager.get_database_session()
    service = session.query(Service).filter_by(id=service_id).first()

    service.update(request.json, form)
    session.commit()

    logging.info(u'Updated service: {}'.format(service_id))

    response = Utilities.object_to_json(service)
    session.close()

    return response

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
    session.close()
    logging.info(u'Deleted service: {}'.format(service_id))
    return

class ServicesByEvent(Resource):
  """
  Servicios de eventos por eventos
  """

  def get(self, event_id):
    """
    Obtener los servicios de un evento
    :param event_id: 
    :return: 
    """
    session = DbManager.get_database_session()
    event = session.query(Event).filter_by(id=event_id).first()

    services = list()
    for event_service in event.services:
      services.append(event_service.service)

    response = Utilities.list_to_json(services)
    session.close()

    return response

api.add_resource(Services, '/api/services', '/api/services/<string:type>')
api.add_resource(ServicesByUser, '/api/users/<int:user_id>/services',
                 '/api/users/<int:user_id>/services/<int:service_id>')
api.add_resource(ServicesByEvent, '/api/events/<int:event_id>/services')
