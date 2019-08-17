# Base Docker image for Ruby
FROM ruby:2.4.5
# Update system
RUN apt-get update -qq
# Install system dependencies
RUN apt-get install -y nodejs postgresql-client

RUN apt-get install -y cron
# Create app directory
RUN mkdir /plymouth-parks
# Make the newly created directory the working directory
WORKDIR /plymouth-parks
# Copy the bootstrap Gemfile
COPY Gemfile /plymouth-parks/Gemfile
# Copy the bootstrap Gemfile.lock
COPY Gemfile.lock /plymouth-parks/Gemfile.lock
# Run bundler
RUN bundle install
# Copy app over
COPY . /plymouth-parks
# Expose port
EXPOSE 3000
# Run script
CMD script/start
