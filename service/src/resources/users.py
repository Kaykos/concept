# -*- coding: utf-8 -*-
import datetime
import logging

import wtforms_json
from flask import Blueprint, request
from flask_restful import Api, Resource, fields, marshal_with

from db_manager import DbManager
from forms import UserCreateForm
from models import User
from resources import APIError

errors = {
  'IncompleteInformation': {
    'message': u'Incomplete information'
  },
  'UserNameExists': {
    'message': u'Username not available'
  },
  'EmailExists': {
    'message': u'Email is already registered'
  }
}


# Excepciones
class IncompleteInformation(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)


class UserNameExists(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)


class EmailExists(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)


# Creación del blueprint
users_bp = Blueprint('users_api', __name__)
api = Api(users_bp, errors=errors, catch_all_404s=True)

# Campos para retornar
user_fields = {
  'id': fields.Integer,
  'name': fields.String,
  'last_name': fields.String,
  'email': fields.String,
  'user_name': fields.String,
  'role': fields.String
}


class Users(Resource):
  """
  Servicios de usuarios
  """

  @marshal_with(user_fields)
  def get(self, user_name=None):
    """
    Obtener un user identificado por user_name, validadndo los datos
    :param user_id:
    :return:
    """

    # Validar los campos de la solicitud
    if user_name:
      wtforms_json.init()
      form = UserCreateForm.from_json(request.json)
      form.user_name = user_name
      if not form.validate():
        raise IncompleteInformation

      session = DbManager.get_database_session()
      user = session.query(User).filter_by(user_name=user_name).first()
      session.close()

      return user

    else:
      session = DbManager.get_database_session()
      users = session.query(User).order_by(User.id).all()
      session.close()

      return users

  @marshal_with(user_fields)
  def post(self):
    """
    Crear un usuario
    :return:
    """

    # Validar los campos de la solicitud
    wtforms_json.init()
    form = UserCreateForm.from_json(request.json)
    if not form.validate():
      raise IncompleteInformation

    # Crear un nuevo user
    user = User(
      name=form.name.data,
      last_name=form.last_name.data,
      user_name=form.user_name.data,
      email=form.email.data,
      password=form.password.data,
      role=form.role.data,
      registered_at=datetime.datetime.now(),
    )

    # Actualizar en la base de datos
    session = DbManager.get_database_session()
    session.add(user)
    session.commit()
    session.close()

    return user

  def put(self, usuario_id):
    logging.info('Usuarios put: {}'.format(usuario_id))

  def delete(self, usuario_id):
    logging.info('Usuarios delete: {}'.format(usuario_id))


api.add_resource(Users, '/api/users', '/api/users/<string:user_name>')
