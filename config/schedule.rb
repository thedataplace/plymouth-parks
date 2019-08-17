# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Learn more: http://github.com/javan/whenever

ENV.each { |k, v| env(k, v) }

set :output, "/plymouth-parks/log/cron_log.log"

every 1.day at: '12:00 am' do
  rake "image_storage_urls:sync"
end
