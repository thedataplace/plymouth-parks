# Abstracts data entry database table
class DataEntry < ApplicationRecord
  has_one_attached :image

  def image_url
    image.variant(auto_orient: true).processed.service_url
  end
end
