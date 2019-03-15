# rubocop:disable Metrics/BlockLength
ActiveAdmin.register DataEntry do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  permit_params :title,
                :subtitle,
                :username,
                :latitude,
                :longitude,
                :notes,
                :image

  index do
    selectable_column
    id_column
    column :title
    column :subtitle
    column :latitude
    column :longitude
    column :created_at
    column :image do |entry|
      if entry.image.attached?
        image_tag url_for(entry.image), width: '50'
      end
    end
    actions
  end
  show do
    attributes_table do
      row :title
      row :subtitle
      row :latitude
      row :longitude
      row :image do |entry|
        if entry.image.attached?
          image_tag url_for(entry.image), width: '500'
        end
      end
    end
  end
  form do |f|
    f.inputs do
      f.input :title, as: :string
      f.input :subtitle, as: :string
      f.input :latitude, as: :number, step: '0.000001'
      f.input :longitude, as: :number, step: '0.000001'
      f.input :notes
      f.input :image, as: :file
    end
    f.actions
  end
end
# rubocop:enable Metrics/BlockLength
