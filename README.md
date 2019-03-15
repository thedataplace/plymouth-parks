# Data Capture Project

This repository stores the source code for the data capture and mapping web application.

### Technology Stack
- Ruby on Rails
- PostgreSQL
- PostGIS
- Docker
- Docker Compose
- Docker Machine
- Digital Ocean

### Development Environment

Build web image
```shell
docker-compose build web
```

Set up database
```shell
docker-compose run --rm web rails db:create \
                                  db:gis:setup \
                                  db:migrate
```

Seed the database
```shell
docker-compose run --rm web rails db:seed
```

Start development server
```shell
docker-compose up
```

### Configuration

### Digital Ocean

Create Digital Ocean Droplet running Docker Engine
```shell
docker-machine create --driver=digitalocean \
                      --digitalocean-access-token=$DO_TOKEN \
                      --digitalocean-backups=true \
                      --digitalocean-image=ubuntu-18-04-x64 \
                      --digitalocean-size=2gb \
                      --digitalocean-region=lon1 \
                      [project-name]
```

Set up terminal to interact with remote host
```shell
eval $(docker-machine env [project-name])
```

Build prod web image
```shell
docker-compose -f docker-compose.prod.yml build prod_web
```

Build prod database and webserver images
```shell
docker-compose -f docker-compose.prod.yml up -d webserver prod_db
```

Initialize production database
```shell
docker-compose -f docker-compose.prod.yml run --rm prod_web \
  rails db:create db:gis:setup db:migrate
```

Start up application server
```shell
docker-compose -f docker-compose.prod.yml up -d prod_web
```

Restart webserver
```shell
docker-compose -f docker-compose.prod.yml restart webserver
```
