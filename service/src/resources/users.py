# -*- coding: utf-8 -*-
import logging
import datetime
import wtforms_json
from models import User
from db_manager import DbManager
from forms import UserCreateForm
from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource, fields, marshal_with
from resources import APIError

errors = {
  'IncompleteInformation': {
    'message': u'La información ingresada no es completa',
    'error': 1
  },
  'LastNameRequired': {
    'message': u'Es necesario ingresar un apellido',
    'error': 1
  },
  'UserNameExists': {
    'message': u'El usuario no está disponible',
    'error': 1
  },
  'EmailExists': {
    'message': u'El correo electrónico ya está registrado',
    'error': 1
  },
  'UserDoesNotExist': {
    'message': u'El nombre de usuario no está registrado',
    'error': 1
  },
  'IncorrectPassword': {
    'message': u'La contraseña ingresada no es correcta',
    'error': 1
  }
}

#Excepciones
class IncompleteInformation(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

class LastNameRequired(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

class UserNameExists(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

class EmailExists(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

class UserDoesNotExist(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__,self).__init__(*args, **kwargs)

class IncorrectPassword(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)


#Creación del blueprint
users_bp = Blueprint('users_api', __name__)
api = Api(users_bp, errors=errors, catch_all_404s=True)

#Campos para retornar
user_fields = {
  'id': fields.Integer,
  'name': fields.String,
  'last_name': fields.String,
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
    Obtener un usuario identificado por user_name, validadndo los datos
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
      user = session.query(User).filter_by(user_name).first()
      session.close()

      return user

  @marshal_with(user_fields)
  def post(self):
    """
    Creación de un usuario
    :return:
    """

    #Validar los campos de la solicitud
    wtforms_json.init()
    form = UserCreateForm.from_json(request.json)
    if not form.validate():
      raise IncompleteInformation


    #Crear un nuevo usuario
    user = User(
      name=form.name.data,
      last_name=form.last_name.data,
      user_name=form.user_name.data,
      address=form.address.data,
      email=form.email.data,
      password=form.password.data,
      role=form.role.data,
      registered_at=datetime.datetime.now(),
    )

    #Actualizar en la base de datos
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
