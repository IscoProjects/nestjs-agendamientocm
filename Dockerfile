# Establecer la imagen base
FROM node:18

# Crear el directorio de la aplicación en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos del paquete.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install --omit=dev

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "npm", "run", "start:prod" ]
