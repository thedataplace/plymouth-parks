Rails.application.routes.draw do
  resources :data_entries
  root "data_entries#new"
end
