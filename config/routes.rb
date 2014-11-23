Rails.application.routes.draw do

  get 'search/search'

  resources :movies, only: [:create, :show, :edit] do
    resources :vines, only: [:destroy]
  end

  root 'application#index'
  get 'search' => 'search#search'

end
