FROM node:18-alpine

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]