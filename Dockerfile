# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto en el que la API escuchará
EXPOSE 3000

# Define el comando para ejecutar la API
CMD ["npm", "start"]
