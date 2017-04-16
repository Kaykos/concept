# -*- coding: utf-8 -*-
from flask import current_app
from sqlalchemy import create_engine
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker

class DbManager:

  connection_string = None
  engine = None

  @staticmethod
  def set_connection_string():
    if DbManager.connection_string == None:
      if current_app.config.get('DEBUG'):
        # Desarrollo
        DbManager.connection_string = 'mysql+mysqldb://{user}:{password}@{host}/{database}?charset=utf8'.format(
          user=current_app.config.get('CLOUDSQL_USER'),
          password=current_app.config.get('CLOUDSQL_PASSWORD'),
          host=current_app.config.get('DB_HOST'),
          database=current_app.config.get('CLOUDSQL_DATABASE'),
        )
      else:
        # Produccion
        DbManager.connection_string = 'mysql+mysqldb://{user}:{password}@/{database}?unix_socket=/cloudsql/{instance_connection_name}?charset=utf8'.format(
          user=current_app.config.get('CLOUDSQL_USER'),
          password=current_app.config.get('CLOUDSQL_PASSWORD'),
          database=current_app.config.get('CLOUDSQL_DATABASE'),
          instance_connection_name=current_app.config.get('CLOUDSQL_CONNECTION_NAME')
        )

  @staticmethod
  def get_database_session():
    if DbManager.connection_string == None:
      DbManager.set_connection_string()
    if DbManager.engine == None:
      #DbManager.engine = create_engine('mysql+mysqldb://root:root-password@/concept-db?unix_socket=/cloudsql/events-concept:us-central1:concept-db')
      DbManager.engine = create_engine(DbManager.connection_string)

    #engine = create_engine(connection_string, echo=current_app.config.get('DEBUG'))
    Session = sessionmaker(bind=DbManager.engine, expire_on_commit=False)
    session = Session()
    session.execute(text('SET NAMES utf8'))
    return session