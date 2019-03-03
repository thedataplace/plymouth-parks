# Abstracts data entry database table
class DataEntry < ApplicationRecord
  has_one_attached :image
end
