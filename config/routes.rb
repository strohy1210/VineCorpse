Rails.application.routes.draw do

  get 'search/search'

  get '/auth/facebook/callback', to: 'sessions#create'
  get '/auth/facebook', as: 'login'
  delete '/logout', to: 'sessions#destroy'

  resources :movies, only: [:create, :show, :edit, :update] do
    resources :vines, only: [:destroy]
  end

  root 'application#index'
  get 'search' => 'search#search'

end
