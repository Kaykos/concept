# -*- coding: utf-8 -*-
import datetime

from sqlalchemy import Column, DateTime, Integer, String, ForeignKey, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

from file_manager import FileManager

Base = declarative_base()

default_user_image_url = 'https://storage.googleapis.com/events-concept.appspot.com/img/users/default.png'
default_service_image_url = 'https://storage.googleapis.com/events-concept.appspot.com/img/services/default.png'


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
  user_image = Column(String(100), nullable=False)

  created_services = relationship("Service")

  def __init__(self, form):
    self.name = form.name.data
    self.last_name = form.last_name.data
    self.user_name = form.user_name.data.lower()
    self.email = form.email.data.lower()
    self.password = form.password.data
    self.role = form.role.data
    self.registered_at = datetime.datetime.now()
    self.user_image = default_user_image_url

  def update(self, json_body):
    """
    Actualizar los atributos del usuario
    :param json_body: 
    :return: 
    """
    if 'email' in json_body:
      self.email = json_body['email'].lower()
    if 'password' in json_body:
      self.password = json_body['password']
    if 'image_data' in json_body:
      file_data = json_body['image_data']
      file_extension = json_body['extension']
      file_path = 'img/users/{}'.format(self.id)
      self.user_image = FileManager.upload_image(file_data, file_path, file_extension)

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'last_name': self.last_name,
      'email': self.email,
      'user_name': self.user_name,
      'role': self.role,
      'user_image': self.user_image
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
  phone = Column(String(20), nullable=False)
  address = Column(String(50), nullable=False)
  service_image = Column(String(100), nullable=False)

  # Referencia al proveedor que crea el servicio
  provider = relationship("User", foreign_keys=[provider_id])

  def __init__(self, user_id, form):
    self.provider_id = user_id
    self.cost = form.cost.data
    self.description = form.description.data
    self.type = form.type.data
    self.name = form.name.data
    self.rating = 0
    self.phone = form.phone.data
    self.address = form.address.data
    self.service_image = default_service_image_url

  def update_image_url(self, json_body):
    file_data = json_body['image_data']
    file_path = 'img/services/{}'.format(self.id)
    file_extension = json_body['extension']
    self.service_image = FileManager.upload_image(file_data, file_path, file_extension)

  def update(self, json_body):
    """
    Actualizar los atributos del servicio
    :param json_body: 
    :return: 
    """
    if 'cost' in json_body:
      self.cost = json_body['cost']
    if 'description' in json_body:
      self.description = json_body['description']
    if 'name' in json_body:
      self.name = json_body['name']
    if 'phone' in json_body:
      self.phone = json_body['phone']
    if 'address' in json_body:
      self.address = json_body['address']
    if 'image_data' in json_body:
      self.update_image_url(json_body)

  def to_dict(self):
    service_dict = {
      'id': self.id,
      'provider_id': self.provider_id,
      'cost': self.cost,
      'description': self.description,
      'type': self.type,
      'name': self.name,
      'rating': self.rating,
      'phone': self.phone,
      'address': self.address,
      'service_image': self.service_image
    }
    if self.type == 'locacion':
      service_dict['latitude'] = float(str(self.latitude))
      service_dict['longitude'] = float(str(self.longitude))

    return service_dict