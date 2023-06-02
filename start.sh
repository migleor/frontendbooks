#!/bin/bash

# Navegar al directorio de tu aplicación
cd /mnt/efs/fs1/frontendbooks

# Instalar las dependencias de tu aplicación
npm install

#contruir un build de la aplicacion
#npm run build

# Iniciar la aplicación en el puerto 3000
npm start

