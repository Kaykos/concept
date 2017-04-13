# -*- coding: utf-8 -*-
from db_manager import DbManager
from wtforms import Form, StringField, PasswordField, IntegerField, DecimalField
from wtforms.validators import InputRequired, Length, Email, ValidationError
import logging


#Usuarios

class UserCreateForm(Form):
  """
  Formulario para la creación de un usuario
  """
  name = StringField(InputRequired())
  last_name = StringField()
  user_name = StringField(InputRequired())
  address = StringField(InputRequired())
  email = StringField(validators=[InputRequired(), Email()])
  password = PasswordField([InputRequired()])
  role = StringField([InputRequired()])

  def validate_last_name(self, field):
    """
    Verificar la existencia de apellido al crear un usuario cliente
    :param field:
    :return:
    """
    from resources.users import LastNameRequired
    if self.role.data == 'client' and field.data == None:
      raise LastNameRequired()

  def validate_user_name(self,field):
    """
    Verificar la existencia del nombre de usuario
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

  user_name = StringField()
  password = PasswordField(InputRequired())
  user = None

  def validate_user_name(self, field):
    """
    Verificar la existencia del usuario
    :param field:
    :return:
    """
    from models import User
    from resources.users import UserDoesNotExist

    session = DbManager.get_database_session()
    user = session.query(User).filter_by(user_name=field.data).first()
    session.close()
    if not user:
      raise UserDoesNotExist
    else:
      self.user = user

  def validate_password(self, field):
    """
    Verificar la contraseña ingresada
    :param field:
    :return:
    """
    from resources.users import IncorrectPassword

    if not field.data == self.user.password:
      raise IncorrectPassword