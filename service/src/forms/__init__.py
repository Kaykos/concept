# -*- coding: utf-8 -*-
from wtforms import Form, StringField, PasswordField, IntegerField, DecimalField
from wtforms.validators import InputRequired, Email, Optional

from db_manager import DbManager

# Usuarios
from forms.validators import check_email, check_user_id, check_service_id, check_user_is_client, check_user_name


class UserCreateForm(Form):
  """
  Formulario para la creación de un usuario
  """

  name = StringField(InputRequired())
  last_name = StringField()
  user_name = StringField(validators=[InputRequired(), check_user_name])
  address = StringField(InputRequired())
  email = StringField(validators=[InputRequired(), Email(), check_email])
  password = PasswordField([InputRequired()])
  role = StringField([InputRequired()])
  session = None

class UserAuthenticateForm(Form):
  """
  Formulario para la autenticación de un usuario
  """
  id = StringField()
  password = PasswordField(InputRequired())
  id_is_email = False
  user = None
  session = None

  def validate_id(self, field):
    """
    Verificar la existencia del usuario
    :param field:
    :return:
    """
    from models import User
    from resources.auth import UserDoesNotExist, EmailDoesNotExist

    if self.id_is_email:
      user = self.session.query(User).filter_by(email=field.data).first()
    else:
      user = self.session.query(User).filter_by(user_name=field.data).first()
    self.session.close()

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

class UserUpdateForm(Form):
  """
  Formulario para la actualización de los datos de un usuario
  """
  id = IntegerField(check_user_id)
  email = StringField(validators=[Optional(), Email(), check_email])
  password = PasswordField(Optional())

class UserDeleteForm(Form):
  """
  Formulario para la eliminación de un usuario
  """
  id = IntegerField(check_user_id)

class ServiceCreateForm(Form):
  """
  Formulario para la obtención de servicios
  """
  provider_id = IntegerField(check_user_id)
  cost = IntegerField(InputRequired())
  description = StringField(InputRequired())
  type = StringField(InputRequired())
  name = StringField(InputRequired())
  latitude = DecimalField(Optional())
  longitude = DecimalField(Optional())
  phone = StringField(Optional())
  address = StringField(Optional())

class ServiceUpdateForm(Form):
  """
  Formulario para la actualización de un servicio
  """
  provider_id = IntegerField(check_user_id)
  id = IntegerField(check_service_id)
  cost = IntegerField(Optional())
  description = StringField(Optional())
  name = StringField(Optional())
  phone = StringField(Optional())
  address = StringField(Optional())

class ServiceDeleteForm(Form):
  """
  Formulario para la eliminación de un servicio
  """
  provider_id = IntegerField(check_user_id)
  id = IntegerField(check_service_id)

class EventCreateForm(Form):
  """
  Formulario para la creación de un evento
  """
  date = StringField(InputRequired())
  client_id = IntegerField(validators=[InputRequired(), check_user_is_client])
  # TODO Revisar costo
  cost = IntegerField(Optional())
  title = StringField (InputRequired())