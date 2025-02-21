# Use uma imagem base oficial do Node.js 
FROM node:14

# Crie e defina o diretório de trabalho da aplicação
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a aplicação irá rodar
EXPOSE 3333

# Comando para rodar o servidor
CMD ["npm", "start"]