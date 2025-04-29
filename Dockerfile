FROM node:20-slim


WORKDIR /app


RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*


COPY package*.json ./


RUN npm ci


COPY . .


EXPOSE 5001


CMD ["node", "index.js"]