FROM ruby:2.7-alpine3.13

WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk add --no-cache --virtual .build-deps build-base && bundle install && apk del .build-deps
COPY . .

CMD [ "ruby", "./bin/run" ]