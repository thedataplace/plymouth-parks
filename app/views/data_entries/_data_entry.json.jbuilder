json.extract! data_entry, :id, :latitude, :longitude, :title, :subtitle, :username, :notes, :created_at, :updated_at
json.url data_entry_url(data_entry, format: :json)
