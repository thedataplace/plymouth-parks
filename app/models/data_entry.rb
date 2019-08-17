# Abstracts data entry database table
class DataEntry < ApplicationRecord
  has_one_attached :image
  # has_one_attached :secondary_image

  after_create :save_image_storage_url!

  def image_url
    image.variant(auto_orient: true).processed.service_url
  end

  def save_image_storage_url!
    if image.attached?
      update_attributes(image_storage_url: image.service_url,
                        image_storage_url_expiry_date: Date.today + 6.days)
    else
      update_attributes(image_storage_url: nil,
                        image_storage_url_expiry_date: nil)
    end
  end

  def self.refresh_stale_image_storage_urls
    target_date = Date.today + 6.days
    entries = where("image_storage_url_expiry_date <= ?", target_date)
    entries.each { |entry| entry.save_image_storage_url! }
  end
end
