import os
import cloudstorage as gcs

from google.appengine.api import app_identity

class FileManager:
  bucket_name = os.environ.get('BUCKET_NAME', app_identity.get_default_gcs_bucket_name())

  @staticmethod
  def create_file(base64_string, filename, extension):

    print(FileManager.bucket_name)

    image_data = base64_string.decode('base64')
    image_path = '/{}/{}.{}'.format(FileManager.bucket_name, filename, extension)
    with gcs.open(image_path, 'w', content_type='image/'+extension) as f:
      f.write(image_data)
      f.close()