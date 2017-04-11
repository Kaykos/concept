# -*- coding: utf-8 -*-
from google.appengine.ext import ndb


class BaseModel(object):

  @property
  def id(self):
    return self.key.id()


class Usuario(BaseModel, ndb.Model):
  nombres = ndb.StringProperty(required=True)
  apellidos = ndb.StringProperty(required=True)
  email = ndb.StringProperty(required=True)

  @property
  def nombre_completo(self):
    nombre_completo = u'{} {}'.format(self.nombres, self.apellidos)
    return nombre_completo.strip()
