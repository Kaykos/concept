# -*- coding: utf-8 -*-
from flask import current_app
from sqlalchemy import create_engine
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker

class DbManager:

  @staticmethod
  def get_database_session():
    if current_app.config.get('DEBUG'):
      # Desarrollo
      connection_string = 'mysql://{user}:{password}@{host}/{database}?charset=utf8'.format(
        host=current_app.config.get('DB_HOST'),
        user=current_app.config.get('DB_USER'),
        password=current_app.config.get('DB_PASSWORD'),
        database=current_app.config.get('DB_DATABASE')
      )
    else:
      # Produccion
      connection_string = 'mysql+mysqldb://{user}:{password}@/{dbname}?unix_socket=/cloudsql/{projectid}:{instancename}?charset=utf8'.format(
        user=current_app.config.get('DB_USER'),
        password=current_app.config.get('DB_PASSWORD'),
        dbname=current_app.config.get('DB_DATABASE'),
        projectid=current_app.config.get('DB_PROJECT_ID'),
        instancename=current_app.config.get('DB_INSTANCE')
      )

    #engine = create_engine(connection_string, echo=current_app.config.get('DEBUG'))
    engine = create_engine(connection_string)
    Session = sessionmaker(bind=engine, expire_on_commit=False)
    session = Session()
    session.execute(text('SET NAMES utf8'))
    return session