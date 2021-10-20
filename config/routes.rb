Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :events, param: :id
    end
  end

  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
    end
  end

  resources :users do
    member do
      get :delete
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
  get '*a', to: redirect('/'), constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end