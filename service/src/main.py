# -*- coding: utf-8 -*-
import os

from flask import Flask
from flask_cors import CORS

from resources.auth import auth_bp
from resources.events import events_bp
from resources.services import services_bp
from resources.users import users_bp
from resources.utils import utils_bp

#Aplicación principal
app = Flask(__name__)
CORS(app)

# Cargar la correspondiente configuracion dependiendo del entorno donde se este
# ejecutando la aplicación
gae_development = os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/')
config_class = 'Config' if gae_development else 'DevelopmentConfig'
app.config.from_object('config.{}'.format(config_class))

# Registrar los blueprints
app.register_blueprint(users_bp)
app.register_blueprint(services_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(events_bp)
app.register_blueprint(utils_bp)

# @app.errorhandler(500)
# def server_error(e):
#   # Log the error and stacktrace.
#   logging.exception('An error occurred during a request.')
#   return 'An internal error occurred.', 500
