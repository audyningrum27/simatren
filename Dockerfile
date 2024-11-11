FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run dev
EXPOSE 5000
CMD ["node", "index"]
