Rails.application.routes.draw do

  resources :users, only: [:show]
  
  get 'welcome/index'

  get 'search/search'

  get '/auth/facebook/callback', to: 'sessions#create'
  get '/auth/facebook', as: 'login'
  delete '/logout', to: 'sessions#destroy'

  resources :movies, only: [:create, :show, :edit, :update, :destroy] do
    resources :vines, only: [:destroy]
  end

  root 'welcome#index'
  get 'search' => 'search#search'

end
