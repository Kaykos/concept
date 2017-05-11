# -*- coding: utf-8 -*-
from flask import current_app
from sqlalchemy import create_engine
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker

class DbManager:
  """
  Clase encargada de establecer la conexión con la base de datos
  """
  connection_string = None
  engine = None

  @staticmethod
  def set_connection_string():
    """
    Establecer la cadena de conexión dependiendo del entorno
    :return: 
    """
    if DbManager.connection_string == None:
      if current_app.config.get('DEBUG'):
        # Desarrollo
        DbManager.connection_string = 'mysql+mysqldb://{user}:{password}@{host}/{database}'.format(
          user=current_app.config.get('CLOUDSQL_USER'),
          password=current_app.config.get('CLOUDSQL_PASSWORD'),
          host=current_app.config.get('DB_HOST'),
          database=current_app.config.get('CLOUDSQL_DATABASE'),
        )
      else:
        # Produccion
        DbManager.connection_string = 'mysql+mysqldb://{user}:{password}@/{database}?unix_socket=/cloudsql/{instance_connection_name}'.format(
          user=current_app.config.get('CLOUDSQL_USER'),
          password=current_app.config.get('CLOUDSQL_PASSWORD'),
          database=current_app.config.get('CLOUDSQL_DATABASE'),
          instance_connection_name=current_app.config.get('CLOUDSQL_CONNECTION_NAME')
        )

  @staticmethod
  def get_database_session():
    """
    Obtener una sesión de la base de datos
    :return: 
    """
    if DbManager.connection_string == None:
      DbManager.set_connection_string()
    if DbManager.engine == None:
      DbManager.engine = create_engine(DbManager.connection_string)

    Session = sessionmaker(bind=DbManager.engine, expire_on_commit=False)
    session = Session()
    session.execute("SET NAMES utf8mb4")
    session.execute("SET CHARACTER SET utf8mb4")
    session.execute("SET character_set_connection=utf8mb4")
    session.commit()

    #session.execute(text('SET NAMES utf8'))
    return session