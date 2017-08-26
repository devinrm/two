Rails.application.routes.draw do
  root 'welcome#index'

  resources :users, only: [:index, :new, :create, :destroy]
  resources :pairs, only: [:index]
end
