require 'json'

get '/' do
  # Look in app/views/index.erb
  erb :index
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

