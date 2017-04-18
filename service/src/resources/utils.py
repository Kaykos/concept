# -*- coding: utf-8 -*-
import sys
import os
import platform
from flask import Blueprint, jsonify
from flask_restful import Api, Resource

#Creación del blueprint
utils_bp = Blueprint('utils_api', __name__)
api = Api(utils_bp, catch_all_404s=True)


class Utils(Resource):

  def get(self, type=None):

    # Validar los campos de la solicitud
    if type == 'system':

      sys_platform = None
      os_name = None
      platform_plat = None

      try:
        sys_platform = sys.platform
        os_name = os.name
        platform_plat = platform.platform()
      except:
        pass
      return jsonify({'sys:': sys_platform, 'os':os_name, 'plat': platform_plat})

api.add_resource(Utils, '/api/utils', '/api/utils/<string:type>')
