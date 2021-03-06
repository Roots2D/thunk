Rails.application.routes.draw do


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :create]
    resource :session, only: [:create, :destroy]
    resources :messages, only: [:index]
    resources :channels, only: [:index, :show, :create, :destroy, :update]
    resources :direct_messages, only: [:index, :create, :destroy, :update]
  end

  root "static_pages#root"

  mount ActionCable.server => '/cable'
end
