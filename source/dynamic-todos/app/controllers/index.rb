require 'json'

get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/todos' do
  @todos = Todo.order(:created_at).to_json
end

post '/add_todo' do

  if params[:todo_item].present?
    @todo = Todo.new(todo_content: params[:todo_item])

    if @todo.save
      status 201
      return @todo.to_json
    else
      status 418
      "ERROR"
    end

  else
    return 418
    "Error: No item submited."
  end

end

put '/todos/:id' do

  p '*' * 90
  p params
  p '*' * 90

  @todo = Todo.where(id: params[:id]).first
  ap @todo
  if params[:completed] == "true"
    status 200
    @todo.update_attributes(completed: true)
    @todo.to_json
  else
    status 417
    @todo.to_json
  end
end

delete '/todos' do

  # p "&"*90
  # p params
  # p "&"*90

  @todo = Todo.where(id: params[:id]).first

  if @todo.destroy
    status 200
    "todo item destroyed"
  else
    status 418
  end
end
