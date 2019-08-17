namespace :image_storage_urls do
  desc "Refresh stale image storage urls"
  task sync: :environment do
    DataEntry.refresh_stale_image_storage_urls
  end
end
