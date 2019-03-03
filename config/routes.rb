Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  resources :data_entries, only: %i[new create]
  root 'data_entries#new'
end
