import os
import cloudstorage as gcs
import datetime

from google.appengine.api import app_identity

class FileManager:
  bucket_name = os.environ.get('BUCKET_NAME', app_identity.get_default_gcs_bucket_name())
  base_url = 'https://storage.googleapis.com'

  @staticmethod
  def upload_image(base64_string, file_path, extension, previous_image):
    """
    Cargar una imagen al sistema, codificada como una cadena base64
    :param base64_string: 
    :param file_path: 
    :param extension: 
    :return: 
    """

    if base64_string.find('base64,') != -1:
      base64_string = base64_string[base64_string.find('base64,')+len(('base64,')):]

    if previous_image.find('default') == -1:
      try:
        previous = previous_image[previous_image.find('/img'):]
        delete_path = '/{}{}'.format(FileManager.bucket_name, previous)
        gcs.delete(delete_path)
      except gcs.NotFoundError:
        pass

    time_string = datetime.datetime.now().strftime('%Y %M %d %H:%M:%S')
    image_path = '/{}/{}-{}.{}'.format(FileManager.bucket_name, file_path, time_string, extension)
    image_data = base64_string.decode('base64')

    with gcs.open(image_path, 'w', content_type='image/' + extension) as f_out:
      f_out.write(image_data)
      f_out.close()

    image_url = FileManager.base_url + image_path

    return image_url
