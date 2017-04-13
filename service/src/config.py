# -*- coding: utf-8 -*-
import pytz


APP_TZ = 'America/Bogota'
APP_LC = 'es_ES'

dt_fmt_param = {
  'tzinfo': pytz.timezone(APP_TZ),
  'locale': APP_LC
}


class Config(object):
  """
  Configuración general para producción
  """
  SECRET_KEY = '\x1d\xeetk\x87\xe2l\xef\x05\xeb\x16R\xef\xdf^\x8b\x83\xf2T\xea}F\x9bg'
  DEBUG = False
  TESTING = False
  BUNDLE_ERRORS = True
  PROPAGATE_EXCEPTIONS = False
  ERROR_404_HELP = False

  WTF_CSRF_ENABLED = False

  DOMAIN = 'events-concept.appspot.com'

  DB_USER = 'root'
  DB_PASSWORD = 'root-password'
  DB_DATABASE = 'concept-db'
  DB_INSTANCE = 'events-concept:us-central1:concept-db'
  DB_PROJECT_ID = 'events-concept'


class DevelopmentConfig(Config):
  """
  Configuración para desarrollo
  """
  DEBUG = True

  DOMAIN = 'localhost:8080'

  DB_HOST = '104.197.194.145'
  DB_USER = 'root'
  DB_PASSWORD = 'root-password'
  DB_DATABASE = 'concept-db'
