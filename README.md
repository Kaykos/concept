# Concept

### Instalación de Git
En la consola:
```sh
sudo apt-get install git
```

Datos de identidad:
```sh
git config user.email "mail@example.com"
git config user.name "Name"
```
> Modificar los datos

### Creación de llave SSH (opcional)
En la consola:
```sh
ssh-keygen -t rsa -b 4096 -C "mail@example.com"
```
> Ingresar la dirección de corrreo de GitHub

Presionar enter en las adverentencias:
```sh
Enter file in which to save the key (/home/user/.ssh/id_rsa): 'enter'
Enter passphrase (empty for no passphrase): 'enter'
Enter same passphrase again: 'enter'
```

Iniciar el agente SSH
```sh
eval "$(ssh-agent -s)"
```

Añadir la llave al agente:
```sh
ssh-add ~/.ssh/id_rsa
```

Asociar llave a la cuenta de GitHub
* Copiar el contenido de la llave:
```sh
sudo apt-get install xclip
xclip -sel clip < ~/.ssh/id_rsa.pub
```

* En la parte superior derecha de la página de GitHub: Settings -> SSHH and GPG Keys -> New SSH Key

* Dar un título y pegar el contenido de la llave
    
### Instalación de Google App Engine SDK  
Verificar que la versión instalada de Python sea superior a 2.7.9:
```sh
python2 -V
```

Descargar [Google Cloud SDK]

Descomprimir la carpeta

Abrir el archivo .bashrc y añadir:
```
export PATH=$PATH: .../google-cloud-sdk
```
> Modificar la ruta según donde se haya descomprimido.
__El archivo debe ser editado con permisos de superusuario__

### Instalación de Virualenvwrapper
En la consola:
```sh
sudo apt-get install python-pip python-dev build-essential
sudo pip install virtualenv virtualenvwrapper
sudo pip install --upgrade pip
```

Abrir el archivo .bashrc y añadir:
```
export WORKON_HOME=~/virtualenvs
source /usr/local/bin/virtualenvwrapper.sh

function check_for_virtual_env {
  [ -d .git ] || git rev-parse --git-dir &> /dev/null

  if [ $? = 0 ]; then
    local ENV_NAME=`basename \`pwd\``

    if [ "${VIRTUAL_ENV##*/}" != $ENV_NAME ] && [ -e $WORKON_HOME/$ENV_NAME/bin/activate ]; then
      workon $ENV_NAME && export CD_VIRTUAL_ENV=$ENV_NAME
    fi
  elif [ $CD_VIRTUAL_ENV ]; then
    deactivate && unset CD_VIRTUAL_ENV
  fi
}

function cd {
  builtin cd "$@" && check_for_virtual_env
}

check_for_virtual_env
```

Crear entonrno virtual para el proyecto:
```sh
mkvirtualenv concept
```
> En caso de que no se encuentre el comando `mkvirtualenv` cerrar sesión y ejecutar una nueva terminal

### Clonación del repositorio
Si se creó una llave SSH:
```sh
git clone git@github.com:Kaykos/concept.git
```

Si no se creó:
```sh
git clone https://github.com/Kaykos/concept.git
```
> Si no se hace por SSH se deben ingresar los datos de la cuenta de GitHub cada vez que se hace push al repositorio
    

#### Cambios de .bashrc
Ejemplo de cómo debe quedar el final del archivo .bashrc
```
...
# Google Cloud SDK
export PATH=$PATH:~/apps/google-cloud-sdk/bin

# Virtualenvwrapper
export WORKON_HOME=~/virtualenvs
source /usr/local/bin/virtualenvwrapper.sh

# Automatic workon when entering folder
function check_for_virtual_env {
  [ -d .git ] || git rev-parse --git-dir &> /dev/null

  # for zsh: $? = 0 
  if [ $? == 0 ]; then
    local ENV_NAME=`basename \`pwd\``

    if [ "${VIRTUAL_ENV##*/}" != $ENV_NAME ] && [ -e $WORKON_HOME/$ENV_NAME/bin/activate ]; then
      workon $ENV_NAME && export CD_VIRTUAL_ENV=$ENV_NAME
    fi
  elif [ $CD_VIRTUAL_ENV ]; then
    deactivate && unset CD_VIRTUAL_ENV
  fi
}

function cd {
  builtin cd "$@" && check_for_virtual_env
}

check_for_virtual_env
```
    
[Google Cloud SDK]: <https://cloud.google.com/sdk/docs/>
