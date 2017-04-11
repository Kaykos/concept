# -*- coding: utf-8 -*-
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
  __tablename__ = 'users'
  id = Column(Integer, primary_key=True)
  name = Column(String(200), nullable=False)
  last_name = Column(String(200), nullable=True)
  email = Column(String(200), nullable=False, unique=True)
  password = Column(String(200), nullable=False)
  role = Column(String(200), nullable=False)
  registered_at = Column(DateTime(), nullable=False)
  phone = Column(String(30), nullable=False)

class Service(Base):
  __tablename__ = 'services'
  id = Column(Integer, primary_key=True)
