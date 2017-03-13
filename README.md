# Concept

### Instalación de Git
1. En la consola:
```sh
sudo apt-get install git
```

### Creación de llave SSH (opcional)
1. En la consola:
```sh
ssh-keygen -t rsa -b 4096 -C "mail@example.com"
```
> Ingresar la dirección de corrreo de GitHub

2. Presionar enter en las adverentencias:
```sh
Enter file in which to save the key (/home/user/.ssh/id_rsa): 'enter'
Enter passphrase (empty for no passphrase): 'enter'
Enter same passphrase again: 'enter'
```

3. Iniciar el agente SSH
```sh
eval "$(ssh-agent -s)"
```

4. Añadir la llave al agente:
```sh
ssh-add ~/.ssh/id_rsa
```

5. Asociar llave a la cuenta de GitHub
..* Copiar el contenido de la llave:
```sh
sudo apt-get install xclip
xclip -sel clip < ~/.ssh/id_rsa.pub
```

..* En la parte superior derecha de la página de GitHub: Settings -> SSHH and GPG Keys -> New SSH Key

..* Dar un título y pegar el contenido de la llave
    
### Instalación de Google App Engine SDK  
1. Verificar que la versión instalada de Python sea superior a 2.7.9:
```sh
python2 -V
```

2. Descargar [Google Cloud SDK]

3. Descomprimir la carpeta

4. Abrir el archivo .bashrc y añadir:
```
export PATH=$PATH: .../google-cloud-sdk
```
> Modificar la ruta según donde se haya descomprimido
__El archivo debe ser abierto con permisos de superusuario__

### Instalación de Virualenvwrapper
1. En la consola:
```sh
sudo apt-get install python-pip python-dev build-essential
sudo pip install virtualenv virtualenvwrapper
sudo pip install --upgrade pip
```

2. Abrir el archivo .bashrc y añadir:
```
export WORKON_HOME=~/virtualenvs
source /usr/local/bin/virtualenvwrapper.sh
```

3. Crear entonrno virtual para el proyecto:
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
