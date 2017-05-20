import os
import cloudstorage as gcs

from google.appengine.api import app_identity

class FileManager:
  bucket_name = os.environ.get('BUCKET_NAME', app_identity.get_default_gcs_bucket_name())
  base_url = 'https://storage.googleapis.com'

  @staticmethod
  def upload_image(base64_string, file_path, extension):
    """
    Cargar una imagen al sistema, codificada como una cadena base64
    :param base64_string: 
    :param file_path: 
    :param extension: 
    :return: 
    """

    missing_padding = len(base64_string) % 4
    if missing_padding != 0:
      base64_string += b'=' * (4 - missing_padding)

    image_data = base64_string.decode('base64')
    image_path = '/{}/{}.{}'.format(FileManager.bucket_name, file_path, extension)

    with gcs.open(image_path, 'w', content_type='image/' + extension) as f_out:
      f_out.write(image_data)
      f_out.close()

    image_url = FileManager.base_url + image_path

    return image_url