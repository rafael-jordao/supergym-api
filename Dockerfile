# FROM node:alpine

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# RUN apk add chromium

# WORKDIR /usr/app

# COPY package*.json ./
# COPY yarn.lock ./
# RUN yarn install

# COPY . .

# EXPOSE 3000

# CMD ["yarn", "dev"]

FROM node:alpine

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# RUN apk add --no-cache \
#   chromium \
#   nss \
#   freetype \
#   freetype-dev \
#   harfbuzz \
#   ca-certificates \
#   ttf-freefont

# ENV CHROMIUM_PATH /usr/bin/chromium-browser
# ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

RUN apk add chromium

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000

# RUN addgroup -S nodejs && adduser -S appuser -G nodejs
# USER appuser

CMD ["yarn", "dev"]


