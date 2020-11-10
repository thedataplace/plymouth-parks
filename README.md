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
docker-compose -f docker-compose.dev.yml build app_server
```

Set up the development database
```shell
docker-compose -f docker-compose.dev.yml run --rm app_server rails db:create \
                                                                   db:gis:setup \
                                                                   db:migrate \
                                                                   db:seed
```

Start the development application server container
```shell
docker-compose -f docker-compose.dev.yml up app_server
```

Open the application running locally in your browser at [http://localhost:3000](http://localhost:3000).

### Design

The default CSS for the web form is located in `app/assets/stylesheets/web_form.css`. Additional CSS or SCSS files added to the `app/assets/stylesheets` directory will be picked up by automatically by the application's asset pipeline.

Static images can be added to the `app/assets/images` directory. To refer to an image in a stylesheet use the `url` helper as in the following example (given an image `app/assets/images/gradient-background.png`).

```CSS
.container {
  background-image: url(gradient-background.png);
}
```

To render an image directly in HTML / erb. For example in `app/views/data_entries/_form.html.erb` (the main entry point for the app right now), you can use an `erb` tag and Ruby helper method as follows.

```
<%= image_tag('plymouth-city-council.png', id: 'header-logo', alt: 'Logo') %>
```

Which will output the HTML

```HTML
<img class="logo" alt="Logo" src="/assets/plymouth-city-council-[ASSET_HASH_STAMP].png">
```

Note: `ASSET_HASH_STAMP` is an identifier auto-generated when the app is spun up

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
docker-compose -f docker-compose.prod.yml build app_server
```

Start up the production database
```shell
docker-compose -f docker-compose.prod.yml up -d database
```

Initialize the production database
```shell
docker-compose -f docker-compose.prod.yml run --rm app_server rails db:create \
                                                                    db:gis:setup \
                                                                    db:migrate
```

Start up the production application server container
```shell
docker-compose -f docker-compose.prod.yml up -d app_server
```

Restart the production web server (already started from SSL setup script)
```shell
docker-compose -f docker-compose.prod.yml restart web_server
```

#### Administrator Setup

To create an administrator user:

Connect to the production console (REPL)
```shell
docker-compose -f docker-compose.prod.yml exec app_server rails console
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

curl -v \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjA0OTI2MTE1LCJleHAiOjE2MDU1MzA5MTUsImp0aSI6ImE5MjI3YmY1LWU1YmEtNDdiYi1hMmQ4LWM5MTU3YTQzNDhlMSJ9.TiddehnBHoBDJr-DinqkFN3_tqcIktI5nkamN4TuSYA' \
  'http://localhost:3000/users'
