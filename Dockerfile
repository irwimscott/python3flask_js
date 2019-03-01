FROM tiangolo/meinheld-gunicorn-flask:python3.7
LABEL maintainer="Irwim Scott <irwimscott@gmail.com>"

ENV TZ="America/Sao_Paulo"
ENV PORT="8080"
EXPOSE 8080

COPY ./app /app
