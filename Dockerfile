FROM denoland/deno:alpine as builder

LABEL description="Mock server for development and testing purposes"

WORKDIR /app

COPY . .

RUN deno compile --allow-all --unstable --output server main.ts

FROM frolvlad/alpine-glibc:alpine-3.17

WORKDIR /app

RUN adduser -D deno_user
USER deno_user

COPY --from=builder /app/server /usr/local/bin/server

ENTRYPOINT [ "server" ]
