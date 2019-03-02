# Plymouth Parks

This repository stores the source code for the Plymouth parks data capture and mapping web application.

### Technology Stack
- Ruby on Rails
- PostgreSQL
- PostGIS
- Google Cloud Platform
- Google App Engine
- Google Cloud SQL

### Database Initialization

Create database
```shell
bundle exec rails db:create
```

Set up PostGIS extension
```shell
bundle exec rails db:rails db:gis:setup
```

### Development

Start development server
```shell
bundle exec rails server
```
