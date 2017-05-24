# -*- coding: utf-8 -*-
import logging
import wtforms_json
from flask import Blueprint, request
from flask_restful import Api, Resource

from db_manager import DbManager
from forms import EventCreateForm
from models import Event, User
from resources import APIError
from utilities import Utilities

errors = {
  'UserIsNotClient': {
    'message': u'No tiene permisos para crear un evento'
  }
}

class UserIsNotClient(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

#Creación del blueprint
events_bp = Blueprint('events_api', __name__)
api = Api(events_bp, errors=errors, catch_all_404s=True)

# Servicios de eventos
class Events(Resource):
  """
  Servicios de eventos
  """

  def get(self):
    """
    Obtener todos los eventos
    :return: 
    """

    session = DbManager.get_database_session()
    events = session.query(Event).order_by(Event.id).all()
    response = Utilities.list_to_json(events)
    session.close()
    return response

class EventsByUser(Resource):

  def get(self, user_id):
    """
    Obtener los eventos de un usuario
    :param user_id: 
    :return: 
    """
    session = DbManager.get_database_session()

    user = session.query(User).filter_by(id=user_id).first()

    if user.role == 'cliente':
      events = user.created_events
    elif user.role == 'proveedor':
      events = user.get_associated_events_to_services()

    response = Utilities.list_to_json(events)
    session.close()
    return response

  def post(self, user_id):
    """
    Crear un evento
    :param user_id: 
    :return: 
    """
    wtforms_json.init()
    form = EventCreateForm.from_json(request.json)
    form.client_id = user_id

    event = Event(form)

    session = DbManager.get_database_session()
    session.add(event)
    session.flush()

    event.associate_services(request.json['services'], session)

    session.commit()

    response = Utilities.object_to_json(event)
    session.close()
    return response

  def delete(self, user_id, event_id):
    """
    Eliminar un evento
    :param usuario_id: 
    :return: 
    """

    session = DbManager.get_database_session()
    event = session.query(Event).filter_by(id=event_id).first()
    session.delete(event)
    session.commit()
    session.close()
    logging.info(u'Delete1d service: {}'.format(event_id))
    return

api.add_resource(Events, '/api/events')
api.add_resource(EventsByUser, '/api/users/<int:user_id>/events',
                 '/api/users/<int:user_id>/events/<int:event_id>')