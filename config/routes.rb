Rails.application.routes.draw do
  devise_for :users
  devise_for :admin_users, ActiveAdmin::Devise.config

  ActiveAdmin.routes(self)

  resources :data_entries, only: %i[new create]

  namespace :api do
    namespace :v1 do
      resources :data_entries
      resources :users, only: [:index]
      devise_scope :user do
        post '/tokens', to: 'tokens#create'
        post '/register', to: 'registrations#create'
        delete '/tokens', to: 'tokens#destroy'
      end
    end
  end

  get '/step-one', to: 'react#index'
  get '/step-two', to: 'react#index'
  get '/step-three', to: 'react#index'

  get '/trees/step-one', to: 'react#index'
  get '/trees/step-two', to: 'react#index'
  get '/trees/step-three', to: 'react#index'
  get '/trees', to: 'react#index'

  # get '/login', to: 'react#index'
  # get '/register', to: 'react#index'

  root 'react#index'

  # match '*path', to: 'react#index', via: :all
end
