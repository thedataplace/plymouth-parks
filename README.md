# Plymouth Parks Data Capture Project

This repository stores the source code for the Plymouth Parks Data Capture web application.

### Technology Stack
- Ruby on Rails
- PostgreSQL
- PostGIS
- Nginx
- Cerbot
- Docker
- Docker Compose
- Docker Machine
- Digital Ocean Droplet
- Digital Ocean Spaces

### Development Environment

Build the development application server image
```shell
./script/dev build app_server
```

Set up the development database
```shell
./script/dev run --rm app_server rails db:create db:gis:setup db:migrate db:seed
```

Start the development application server container
```shell
./script/dev up app_server
```

Connect to the dev console
```shell
./script/dev run --rm app_server rails console
```

Open the application running locally in your browser at [http://localhost:3000](http://localhost:3000).

### Design

The main entry point for client assets are app/javascript and app/assets.

### Production Environment

**Note:** :warning: The instructions below have been generalised in preparation to release an open-source version of the project. The following steps go through the process of creating a Docker-enabled virtual machine on Digital Ocean and spinning up the required containerised services in production via Docker Machine.

In order to connect and deploy to the application running at [https://parks.thedata.place](https://parks.thedata.place) you will need additional administration privileges / credentials and coordinate with the current maintainer [jtorreggiani](https://github.com/jtorreggiani).

#### Production Environment Variables

Create `.env.prod` file

```shell
POSTGRES_HOST=database
POSTGRES_PASSWORD=[INSERT_SECURE_PASSWORD_HERE]
POSTGRES_USER=postgres
RAILS_ENV=production
RAILS_LOG_TO_STDOUT=true
SECRET_KEY_BASE=[INSERT_SECURE_SECRET_HERE]
```

#### Create A Remote Virtual Machine

Create a Digital Ocean Droplet running Docker Engine
```shell
docker-machine create --driver=digitalocean \
                      --digitalocean-access-token=$DO_TOKEN \
                      --digitalocean-backups=true \
                      --digitalocean-image=ubuntu-18-04-x64 \
                      --digitalocean-size=s-1vcpu-2gb \
                      --digitalocean-region=lon1 \
                      [project-name]
```

#### Connect To Remote Virtual Machine

Set up the terminal to interact with remote host
```shell
eval $(docker-machine env [project-name])
```
### SSL Configuration

The application requires SSL for geo location services to work in production. Thus, it is configured to use https by default. In order to deploy the application SSL needs to be set up properly.

The SSL certificate is provided by [Internet Security Research Group (ISRG)](https://www.abetterinternet.org)'s free service [Let's Encrypt](https://letsencrypt.org) and the [Electronic Frontier Foundation](https://www.eff.org)'s associated project [Certbot](https://certbot.eff.org/).

**Note:** :construction: The application's SSL setup has been automated via a shell script, however the process still has some gotchas which require a knowledge of Let's Encrypt and Cerbot to debug. Additional documentation and fine-tuning of the shell script is required.

The required configurations are contained to `script/ssh-init`, and `site-ssl.conf`, `script/start`. Your site's specific domain information and admin details need to be added to `script/ssh-init` and `site-ssl.conf`. Once the required fields have been updated, run the following script.

```shell
script/ssh-init
```

Start up `cerbot` service
```shell
docker-compose -f docker-compose.prod.yml up -d certbot
```

### Initialize Production Application & Database Services

Build the production application server image
```shell
./script/prod build app_server
```

Start up the production database
```shell
./script/prod run up -d database
```

Initialize the production database
```shell
./script/prod run --rm app_server rails db:create db:gis:setup db:migrate
```

Start up the production application server container
```shell
./script/prod up -d app_server
```

Restart the production web server (already started from SSL setup script)
```shell
./script/prod restart web_server
```

#### Administrator Setup

To create an administrator user:

Connect to the production console (REPL)
```shell
./script/prod exec app_server rails console
```

You will see the following output
```shell
# Loading production environment (Rails 5.2.2)
# irb(main):001:0>
```

At the the REPL prompt `irb(main):001:0>` enter the follow code with your desired credentials.
```Ruby
AdminUser.create!(email: '[EMAIL]', password: '[PASSWORD]', password_confirmation: '[PASSWORD]')
```

With this main administrator account you can add additional users from the admin panel.

To access the admin panel go to [http://insert-your-domain.com/admin]()

### Troubleshooting

The site runs on 4 separate Docker images on the Digital Ocean server:  
- plymouth-parks_app_server
- postgis
- certbot
- nginx.
logging on to the server with a sudo-capable account allows use of the main docker commands.  
list containers:  
```
sudo docker ps -a
```
start stopped containers:  
```
sudo docker start <containerid>
```
More details available here: https://phoenixnap.com/kb/how-to-list-start-stop-docker-containers
