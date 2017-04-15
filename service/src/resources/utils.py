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


#Creación del blueprint
utils_bp = Blueprint('utils_api', __name__)
api = Api(utils_bp, catch_all_404s=True)


class Utils(Resource):

  def get(self, type=None, id=None):

    # Validar los campos de la solicitud
    if type == 'user':
      session = DbManager.get_database_session()
      user = session.query(User).filter_by(id=id).first()
      session.close()

      return jsonify({"id":user.id, "name":user.name})

api.add_resource(Utils, '/api/utils', '/api/utils/<string:type>/<int:id>')
