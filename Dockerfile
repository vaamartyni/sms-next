# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Компилируем Next.js для продакшена
RUN npm run build

# Экспонируем порт для фронтенда
EXPOSE 3000

# Запускаем Next.js
CMD ["npm", "start"]
