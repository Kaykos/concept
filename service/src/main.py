# -*- coding: utf-8 -*-
import os
import logging
from flask_cors import CORS

from flask import Flask
from resources.users import users_bp
from resources.services import services_bp
from resources.auth import auth_bp
from flask_restful import Api

#Aplicación principal
app = Flask(__name__)
CORS(app)

# Cargar la correspondiente configuracion dependiendo del entorno donde se este
# ejecutando la app
gae_development = os.environ['SERVER_SOFTWARE'].startswith('Development')
config_class = 'DevelopmentConfig' if gae_development else 'Config'
app.config.from_object('config.{}'.format(config_class))

# Registrar los blueprints
app.register_blueprint(users_bp)
app.register_blueprint(services_bp)
app.register_blueprint(auth_bp)

# @app.errorhandler(500)
# def server_error(e):
#   # Log the error and stacktrace.
#   logging.exception('An error occurred during a request.')
#   return 'An internal error occurred.', 500
