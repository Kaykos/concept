# -*- coding: utf-8 -*-
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
    'message': u'Incomplete information',
  },
  'IncorrectPassword': {
    'message': u'Incorrect password',
  },
  'UserDoesNotExist': {
    'message': u'User does not exist',
  },
  'EmailDoesNotExist': {
    'message': u'Email is not registered'
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
      wtforms_json.init()
      form = UserAuthenticateForm.from_json(request.json)
      form.user_id.data = user_id
      form.id_is_email = Utilities.is_email(user_id)

      if not form.validate():
        raise IncompleteInformation

      session = DbManager.get_database_session()

      if form.id_is_email:
        user = session.query(User).filter_by(email=user_id).first()
      else:
        user = session.query(User).filter_by(user_name=user_id).first()
      session.close()

      return user

api.add_resource(Authentication, '/api/auth', '/api/auth/<string:user_id>')
