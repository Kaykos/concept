# -*- coding: utf-8 -*-
from sqlalchemy import Column, DateTime, Integer, String, ForeignKey
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
  password = Column(String(20), nullable=False)
  role = Column(String(20), nullable=False)
  registered_at = Column(DateTime(), nullable=False)

  created_services = relationship("Service")

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

  provider = relationship("User", foreign_keys=[provider_id])

