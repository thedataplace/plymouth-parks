class SerializableDataEntry < JSONAPI::Serializable::Resource
  type 'data_entries'

  attributes :id,
             :latitude,
             :longitude,
             :username,
             :notes,
             :subtitle,
             :title,
             :image_storage_url,
             :image_storage_url_expiry_date
end
