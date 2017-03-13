# Concept

### Instalación de Git
En la consola:
```sh
sudo apt-get install git
```

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
```

Crear entonrno virtual para el proyecto:
```sh
mkvirtualenv concept
```
> En caso de que no se encuentre el comando `mkvirtualenv` cerrar sesión y ejecutar una nueva terminal

### Clonación del repositorio
```sh
git clone https://github.com/Kaykos/concept.git
```
> Ingresar los datos de la cuenta de GitHub
    
    
    
[Google Cloud SDK]: <https://cloud.google.com/sdk/docs/>
