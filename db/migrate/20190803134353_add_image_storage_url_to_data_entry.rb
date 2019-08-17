class AddImageStorageUrlToDataEntry < ActiveRecord::Migration[5.2]
  def change
    add_column :data_entries, :image_storage_url, :text
    add_column :data_entries, :image_storage_url_expiry_date, :date
  end
end
