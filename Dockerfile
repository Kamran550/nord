FROM surnet/alpine-wkhtmltopdf:3.16.2-0.12.6-full as wkhtmltopdf
FROM node:16-alpine AS development

WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:16-alpine AS production

# Install dependencies for wkhtmltopdf
RUN apk add --no-cache \
    libstdc++ \
    libx11 \
    libxrender \
    libxext \
    libssl1.1 \
    ca-certificates \
    fontconfig \
    freetype \
    ttf-dejavu \
    ttf-droid \
    ttf-freefont \
    ttf-liberation \
    # more fonts
  && apk add --no-cache --virtual .build-deps \
    msttcorefonts-installer \
  # Install microsoft fonts
  && update-ms-fonts \
  && fc-cache -f \
  # Clean up when done
  && rm -rf /tmp/* \
  && apk del .build-deps

# Copy wkhtmltopdf files from docker-wkhtmltopdf image
COPY --from=wkhtmltopdf /bin/wkhtmltopdf /bin/wkhtmltopdf

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install --production
COPY . .
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]

