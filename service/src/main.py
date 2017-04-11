# -*- coding: utf-8 -*-
import os
import logging
from flask_cors import CORS

from flask import Flask
from resources.usuarios import usuarios_bp
from resources.services import services_bp
from flask_restful import Api

app = Flask(__name__)
CORS(app)

# Carga la correspondiente configuracion dependiendo del entorno donde se este
# ejecutando la app
gae_development = os.environ['SERVER_SOFTWARE'].startswith('Development')
config_class = 'DevelopmentConfig' if gae_development else 'Config'
app.config.from_object('config.{}'.format(config_class))

# Registra los blueprints
app.register_blueprint(services_bp)

# @app.errorhandler(500)
# def server_error(e):
#   # Log the error and stacktrace.
#   logging.exception('An error occurred during a request.')
#   return 'An internal error occurred.', 500
