from db_manager import DbManager

def check_user_id(form, field):
  """
  Validar la existencia de un usuario identificado por el id
  :param field: 
  :return: 
  """
  from models import User
  from resources.users import UserDoesNotExist

  session = DbManager.get_database_session()
  user = session.query(User).filter_by(id=field.data).first()
  session.close()
  if not user:
    raise UserDoesNotExist

def check_email(form, field):
  """
  Validar la existencia de un usuario registrado con un email
  :param form: 
  :param field: 
  :return: 
  """
  from models import User
  from resources.users import EmailExists

  session = DbManager.get_database_session()
  user = session.query(User).filter_by(email=field.data).first()
  session.close()
  if user:
    raise EmailExists

def check_user_name(form, field):
  """
  Validar la existencia de un usuario
  :param form: 
  :param field: 
  :return: 
  """
  from models import User
  from resources.users import UserNameExists

  session = DbManager.get_database_session()
  user = session.query(User).filter_by(user_name=field.data).first()
  session.close()
  if user:
    raise UserNameExists

def check_service_id(form, field):
  """
  Validar la existencia de un servicio identificado por el id
  :param field: 
  :return: 
  """
  from models import Service
  from resources.services import ServiceDoesNotExist

  session = DbManager.get_database_session()
  service = session.query(Service).filter_by(id=field.data).first()
  session.close()
  if not service:
    raise ServiceDoesNotExist

def check_user_is_client(form, field):
  """
  Validar que el id recibido corresponda a un cliente
  :param form: 
  :param field: 
  :return: 
  """
  from models import User
  from resources.events import UserIsNotClient

  session = DbManager.get_database_session()
  user = session.query(User).filter_by(id=field.data).first()
  session.close()
  if user.role == 'proveedor':
    raise UserIsNotClient