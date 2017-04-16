# -*- coding: utf-8 -*-
from db_manager import DbManager
from wtforms import Form, StringField, PasswordField, IntegerField, DecimalField
from wtforms.validators import InputRequired, Length, Email, ValidationError
import logging


#Usuarios

class UserCreateForm(Form):
  """
  Formulario para la creación de un user
  """
  name = StringField(InputRequired())
  last_name = StringField()
  user_name = StringField(InputRequired())
  address = StringField(InputRequired())
  email = StringField(validators=[InputRequired(), Email()])
  password = PasswordField([InputRequired()])
  role = StringField([InputRequired()])

  def validate_user_name(self,field):
    """
    Verificar la existencia del nombre de user
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

  def validate_email(self, field):
    """
    Validar la existencia del email
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

class UserAuthenticateForm(Form):

  user_id = StringField()
  password = PasswordField(InputRequired())
  id_is_email = False
  user = None

  def validate_user_id(self, field):
    """
    Verificar la existencia del usuario
    :param field:
    :return:
    """
    from models import User
    from resources.auth import UserDoesNotExist, EmailDoesNotExist

    session = DbManager.get_database_session()

    if self.id_is_email:
      user = session.query(User).filter_by(email=field.data).first()
    else:
      user = session.query(User).filter_by(user_name=field.data).first()
    session.close()

    if not user:
      if self.id_is_email:
        raise EmailDoesNotExist
      else:
        raise UserDoesNotExist
    else:
      self.user = user

  def validate_password(self, field):
    """
    Verificar la contraseña ingresada
    :param field:
    :return:
    """
    from resources.auth import IncorrectPassword

    if not field.data == self.user.password:
      raise IncorrectPassword