# rubocop:disable Metrics/BlockLength
ActiveAdmin.register FeatureFlag do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  permit_params :name, :active

  index do
    id_column
    column :name
    column :active
    actions
  end
  show do
    attributes_table do
      row :name
      row :active
    end
  end
  form do |f|
    f.inputs do
      f.input :name, as: :string
      f.input :active, as: :boolean
    end
    f.actions
  end
end
# rubocop:enable Metrics/BlockLength
