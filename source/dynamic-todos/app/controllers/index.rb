# INDEX
get '/' do
  redirect '/todo/new'
end

# NEW
get '/todo/new' do
  @todos = Todo.all
  erb :index
end

# CREATE
post '/todo' do
  @todo = Todo.new(todo_content: params[:content])
  if @todo.save
    content_type :json
    (erb :_todo, :layout => false).to_json
    # {content: @todo.todo_content}.to_json
  else
    status 400
    "Please enter a valid todo"
  end
end

# DELETE
delete '/todo/:id' do
  content_type :json
  @todo = Todo.find(params[:id])
  if @todo.destroy
    {id: @todo.id}.to_json
  else
    status 400
    "NO!!!"
  end
end
