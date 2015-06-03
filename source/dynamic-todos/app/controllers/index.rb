get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do

  p "$" * 90
  p params
  p "$" * 90

  p "Inside /add_todo route!"
end

