class CreateDataEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :data_entries do |t|
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6

      t.string :username

      t.text :notes
      t.text :subtitle
      t.text :title

      t.timestamps
    end
  end
end
