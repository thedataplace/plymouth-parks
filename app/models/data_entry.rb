# Abstracts data entry database table
class DataEntry < ApplicationRecord
  include Rails.application.routes.url_helpers
  include ActiveStorageSupport::SupportForBase64

  has_one_base64_attached :image
  has_one_base64_attached :secondary_image

  scope :with_image_urls_near_expiry, lambda {
    where('image_storage_url_expiry_date <= ?', expiry_date)
  }

  def self.expiry_date
    Date.today + 6.days
  end

  def self.refresh_stale_image_storage_urls
    with_image_urls_near_expiry.each(&:save_image_storage_url!)
  end

  # NOTE: local file path rails_blob_path(image)
  def image_url
    return unless image.attached?

    image.variant(auto_orient: true).processed.service_url
  end

  def secondary_image_url
    return unless secondary_image.attached?

    secondary_image.variant(auto_orient: true).processed.service_url
  end

  def save_image_storage_url!
    if image_url
      update_columns(image_storage_url: image_url,
                     image_storage_url_expiry_date: DataEntry.expiry_date)
    else
      update_columns(image_storage_url: nil,
                     image_storage_url_expiry_date: nil)
    end
  end
end
