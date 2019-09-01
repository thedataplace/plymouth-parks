Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config

  ActiveAdmin.routes(self)

  resources :data_entries, only: %i[new create]
  # root 'data_entries#new'

  namespace :api do
    namespace :v1 do
      resources :data_entries
    end
  end

  # get '/step-one', to: 'react#index'
  # get '/step-two', to: 'react#index'
  # get '/step-three', to: 'react#index'

  get '/trees/step-one', to: 'react#index'
  get '/trees/step-two', to: 'react#index'
  get '/trees/step-three', to: 'react#index'
  get '/trees', to: 'react#index'

  root 'landing_page#index'

  # match '*path', to: 'react#index', via: :all
end
