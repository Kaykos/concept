# -*- coding: utf-8 -*-
from sqlalchemy import Column, DateTime, Integer, String, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
  """
  Representa un usuario en la base de datos
  """
  __tablename__ = 'users'
  id = Column(Integer, primary_key=True)
  name = Column(String(20), nullable=False)
  last_name = Column(String(30), nullable=True)
  user_name = Column(String(30), nullable=False, unique=True)
  email = Column(String(50), nullable=False, unique=True)
  password = Column(String(50), nullable=False)
  role = Column(String(20), nullable=False)
  registered_at = Column(DateTime(), nullable=False)


  created_services = relationship("Service")

  def update(self, body):
    """
    Actualizar los atributos del usuario
    :param body: 
    :return: 
    """
    if 'email' in body:
      self.email = body['email']
    if 'password' in body:
      self.password = body['password']

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'last_name': self.last_name,
      'email': self.email,
      'user_name': self.user_name,
      'role': self.role
    }


class Service(Base):
  """
  Representa un servicio en la base de datos
  """
  __tablename__ = 'services'
  id = Column(Integer, primary_key=True)
  provider_id = Column(Integer, ForeignKey(User.id), nullable=False)
  cost = Column(Integer, nullable=False)
  description = Column(String(100), nullable=False)
  type = Column(String(20), nullable=False)
  name = Column(String(45), nullable=False)
  rating = Column(Integer, nullable=False)
  latitude = Column(Numeric())
  longitude = Column(Numeric())

  #Referencia al proveedor que crea el servicio
  provider = relationship("User", foreign_keys=[provider_id])

  def update(self, body):
    """
    Actualizar los atributos del servicio
    :param body: 
    :return: 
    """
    if 'cost' in body:
      self.cost = body['cost']
    if 'description' in body:
      self.description = body['description']
    if 'name' in body:
      self.name = body['name']

  def to_dict(self):
    return {
      'id': self.id,
      'provider_id': self.provider_id,
      'cost': self.cost,
      'description': self.description,
      'type': self.type,
      'name': self.name,
      'rating': self.rating,
      'latitude': self.latitude,
      'longitude': self.longitude
    }