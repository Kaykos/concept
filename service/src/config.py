# -*- coding: utf-8 -*-
import pytz


APP_TZ = 'America/Bogota'
APP_LC = 'es_ES'

dt_fmt_param = {
  'tzinfo': pytz.timezone(APP_TZ),
  'locale': APP_LC
}


class Config(object):
  SECRET_KEY = '\x1d\xeetk\x87\xe2l\xef\x05\xeb\x16R\xef\xdf^\x8b\x83\xf2T\xea}F\x9bg'
  DEBUG = False
  TESTING = False
  BUNDLE_ERRORS = True
  PROPAGATE_EXCEPTIONS = False
  ERROR_404_HELP = False

  WTF_CSRF_ENABLED = False

  DOMAIN = 'www.concept-event.appspot.com'


class DevelopmentConfig(Config):
  DEBUG = True

  DOMAIN = 'localhost:8080'