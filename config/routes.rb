Ditwh::Application.routes.draw do

  root :to => 'welcome#index'

  # This gives us /map.js and /map.html
  get '/map' => 'welcome#index'
  get '/welcome/map' => 'welcome#map'


end
