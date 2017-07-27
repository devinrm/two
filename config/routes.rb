Rails.application.routes.draw do
  root 'users#new', via: :get

  resources :users, only: [:index, :new, :create]
end
