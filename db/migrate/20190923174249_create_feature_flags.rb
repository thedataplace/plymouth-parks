class CreateFeatureFlags < ActiveRecord::Migration[5.2]
  def change
    create_table :feature_flags do |t|
      t.string :name
      t.boolean :active

      t.timestamps
    end
  end
end
