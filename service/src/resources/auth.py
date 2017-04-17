# -*- coding: utf-8 -*-
import logging
import wtforms_json
from models import User
from db_manager import DbManager
from forms import UserAuthenticateForm
from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource, fields, marshal_with
from resources import APIError
from utilities import Utilities

errors = {
  'IncompleteInformation': {
    'message': u'Datos incompletos',
  },
  'IncorrectPassword': {
    'message': u'Contraseña incorrecta',
  },
  'UserDoesNotExist': {
    'message': u'El usuario no está registrado',
  },
  'EmailDoesNotExist': {
    'message': u'Correo no registrado'
  }
}

class IncompleteInformation(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

class IncorrectPassword(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

class UserDoesNotExist(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

class EmailDoesNotExist(APIError):
  def __init__(self, *args, **kwargs):
    super(self.__class__, self).__init__(*args, **kwargs)

#Creación del blueprint
auth_bp = Blueprint('auth_api', __name__)
api = Api(auth_bp, errors=errors, catch_all_404s=True)

#Campos para retornar
response_fields = {
  'id': fields.Integer,
  'name': fields.String,
  'last_name': fields.String,
  'email': fields.String,
  'user_name': fields.String,
  'role': fields.String
}

class Authentication(Resource):
  """
  Servicios de autenticación
  """

  @marshal_with(response_fields)
  def post(self, user_id=None):
    """
    Obtener un user identificado por user_name, validadndo los datos
    :param user_id:
    :return:
    """

    # Validar los campos de la solicitud
    if user_id:

      session = DbManager.get_database_session()

      wtforms_json.init()
      form = UserAuthenticateForm.from_json(request.json)
      form.id.data = user_id
      form.id_is_email = Utilities.is_email(user_id)
      form.session = session

      if not form.validate():
        session.close()
        raise IncompleteInformation

      if form.id_is_email:
        user = session.query(User).filter_by(email=user_id).first()
      else:
        user = session.query(User).filter_by(user_name=user_id).first()
      session.close()

      logging.info(u'Logged user:{}'.format(user_id))
      return user

api.add_resource(Authentication, '/api/auth', '/api/auth/<string:user_id>')
