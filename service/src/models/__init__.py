# -*- coding: utf-8 -*-
import datetime

from sqlalchemy import Table, Column, DateTime, Integer, String, ForeignKey, Numeric, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

from file_manager import FileManager

Base = declarative_base()

default_user_image_url = u'https://storage.googleapis.com/events-concept.appspot.com/img/users/default.png'
default_service_image_url = u'https://storage.googleapis.com/events-concept.appspot.com/img/services/default.png'

events_services_association_table = Table('events-services', Base.metadata,
                                          Column('event_id', Integer, ForeignKey('events.id')),
                                          Column('service_id', Integer, ForeignKey('services.id')))

class User(Base):
  """
  Representa un usuario en la base de datos
  """

  __tablename__ = 'users'
  id = Column(Integer, primary_key=True)
  name = Column(String(), nullable=False)
  last_name = Column(String(), nullable=True)
  user_name = Column(String(), nullable=False, unique=True)
  email = Column(String(), nullable=False, unique=True)
  password = Column(String(), nullable=False)
  role = Column(String(), nullable=False)
  registered_at = Column(DateTime(), nullable=False)
  user_image = Column(String(), nullable=False)

  created_services = relationship("Service", back_populates="provider")
  created_events = relationship("Event", back_populates="client")

  def __init__(self, form):
    """
    Inicializar los campos con los datos del formulario
    :param form: 
    """
    self.name = form.name.data.encode('utf-8')
    self.last_name = form.last_name.data.encode('utf-8')
    self.user_name = form.user_name.data.encode('utf-8').lower()
    self.email = form.email.data.encode('utf-8').lower()
    self.password = form.password.data.encode('utf-8')
    self.role = form.role.data.encode('utf-8')
    self.registered_at = datetime.datetime.now()
    self.user_image = default_user_image_url

  def update(self, json_body, form):
    """
    Actualizar los atributos del usuario
    :param json_body: 
    :return: 
    """
    if 'email' in json_body:
      self.email = form.email.data.encode('utf-8').lower()
    if 'password' in json_body:
      self.password = form.password.data.encode('utf-8')
    if 'image_data' in json_body:
      file_data = json_body['image_data']
      file_extension = json_body['extension']
      file_path = 'img/users/{}'.format(self.id)
      self.user_image = FileManager.upload_image(file_data, file_path, file_extension)

  def get_associated_events_to_services(self):
    """
    Retornar los eventos creados
    :return: 
    """
    events = list()
    for service in self.created_services:
      events.extend(service.in_events)
    return events

  def to_dict(self):
    """
    Retornar la representación a diccionario del usuario
    :return: 
    """
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
  description = Column(String(), nullable=False)
  type = Column(String(), nullable=False)
  name = Column(String(), nullable=False)
  rating = Column(Integer, nullable=False)
  latitude = Column(Numeric())
  longitude = Column(Numeric())
  phone = Column(String(), nullable=False)
  address = Column(String(), nullable=False)
  service_image = Column(String(1), nullable=False)

  # Referencia al proveedor que crea el servicio
  provider = relationship("User", back_populates="created_services")

  in_events = relationship("Event", secondary=events_services_association_table,
                          back_populates="services")

  def __init__(self, form):
    """
    Inicializar los campos con los datos del formulario
    :param form: 
    """
    self.provider_id = form.provider_id
    self.cost = form.cost.data
    self.description = form.description.data.encode('utf-8')
    self.type = form.type.data.encode('utf-8')
    self.name = form.name.data.encode('utf-8')
    self.rating = 0
    self.phone = form.phone.data.encode('utf-8')
    self.address = form.address.data.encode('utf-8')
    self.service_image = default_service_image_url

  def update_image_url(self, json_body):
    """
    Actualizar la url de la imagen
    :param json_body: 
    :return: 
    """
    file_data = json_body['image_data']
    file_path = 'img/services/{}'.format(self.id)
    file_extension = json_body['extension']
    self.service_image = FileManager.upload_image(file_data, file_path, file_extension)

  def update(self, json_body, form):
    """
    Actualizar los atributos del servicio
    :param json_body: 
    :return: 
    """
    if 'cost' in json_body:
      self.cost = form.cost.data
    if 'description' in json_body:
      self.description = form.description.data.encode('utf-8')
    if 'name' in json_body:
      self.name = form.name.data.encode('utf-8')
    if 'phone' in json_body:
      self.phone = form.phone.data.encode('utf-8')
    if 'address' in json_body:
      self.address = form.address.data.encode('utf-8')
    if 'image_data' in json_body:
      self.update_image_url(json_body)

  def to_dict(self):
    """
    Retornar la representación a diccionario del servicio
    :return: 
    """
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
    if self.type == u'ubicación':
      service_dict['latitude'] = float(str(self.latitude))
      service_dict['longitude'] = float(str(self.longitude))

    return service_dict

class Event(Base):
  """
  Representa un evento en la base de datos
  """
  __tablename__ = 'events'
  id = Column(Integer, primary_key=True)
  date = Column(DateTime, nullable=False)
  rating = Column(Integer, nullable=True)
  comment = Column(String(), nullable=True)
  client_id = Column(Integer, ForeignKey(User.id), nullable=False)
  cost = Column(Integer, nullable=True)
  length = Column(Integer, nullable=False)

  client = relationship("User", back_populates="created_events")
  services = relationship("Service", secondary=events_services_association_table,
                          back_populates="in_events")

  def __init__(self, form):
    """
    Inicializar los campos con los datos del formulario
    :param form: 
    """
    self.date = datetime.datetime.strptime(form.date.data, '%d %m %Y %H:%M')
    self.rating = 0;
    self.client_id = form.client_id
    #TODO Revisar costo
    self.cost = form.cost.data
    self.length = form.length.data

  def associate_services(self, services, session):
    """
    Asociar servicios al evento
    :param services: 
    :param session: 
    :return: 
    """
    for service_id in services:
      service = session.query(Service).filter_by(id=service_id).first()
      self.services.append(service)

  def to_dict(self):
    """
    Retornar la representación a diccionario del evento
    :return: 
    """
    services_ids = list()
    for service in self.services:
      services_ids.append(service.id)
    return {
      'id': self.id,
      'date': self.date.strftime('%d %m %Y %H:%M'),
      'comment': self.comment,
      'client_id': self.client_id,
      'cost': self.cost,
      'length': self.length,
      'services': services_ids
    }