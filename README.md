# Concept

  ### Instalación de Git
  
    ```sh
    sudo apt-get install git
    ```
    
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
		> Modificar la ruta según donde se haya descomprimido
		
  ### Instalación de Virualenvwrapper

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
		>En caso de que no se encuentre el comando `mkvirtualenv` cerrar sesión y ejecutar una nueva terminal

    
    
    
    
[Google Cloud SDK]: <https://cloud.google.com/sdk/docs/>
