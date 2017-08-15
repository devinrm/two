Rails.application.routes.draw do
  root 'welcome#index'

  resources :users, only: [:index, :new, :create]
  resources :pairs, only: [:index]
end
