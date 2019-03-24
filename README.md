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
docker-compose -f docker-compose.dev.yml build app_server
```

Set up database
```shell
docker-compose -f docker-compose.dev.yml run --rm app_server \
  rails db:create db:gis:setup db:migrate
```

Seed the database
```shell
docker-compose -f docker-compose.dev.yml run --rm app_server rails db:seed
```

Start development server
```shell
docker-compose -f docker-compose.dev.yml up app_server
```

### Production Configuration

Create Digital Ocean Droplet running Docker Engine
```shell
docker-machine create --driver=digitalocean \
                      --digitalocean-access-token=$DO_TOKEN \
                      --digitalocean-backups=true \
                      --digitalocean-image=ubuntu-18-04-x64 \
                      --digitalocean-size=s-1vcpu-2gb \
                      --digitalocean-region=lon1 \
                      [project-name]
```

Set up terminal to interact with remote host
```shell
eval $(docker-machine env [project-name])
```

Build production application server image
```shell
docker-compose -f docker-compose.prod.yml build app_server
```

Start up production database and web server containers
```shell
docker-compose -f docker-compose.prod.yml up -d web_server database
```

Initialize production database
```shell
docker-compose -f docker-compose.prod.yml run --rm app_server rails db:create \
                                                                    db:gis:setup \
                                                                    db:migrate
```

Start up production application server container
```shell
docker-compose -f docker-compose.prod.yml up -d app_server
```

Restart production web server
```shell
docker-compose -f docker-compose.prod.yml restart web_server
```
