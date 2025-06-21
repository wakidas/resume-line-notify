# Node 20 の軽量イメージ
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["npm", "start"]
# Cloud Run が渡す $PORT で自動待受け
