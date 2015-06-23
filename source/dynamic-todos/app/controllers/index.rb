get '/' do
  @todos = Todo.all
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  @todo = Todo.new(todo_content: params[:content])
  if @todo.save
    content_type :json
    {id: @todo.id, content: @todo.todo_content}.to_json
  else
    status 400
    "NOO!!"
  end
end

delete '/add_todo/:id' do
  content_type :json
  @todo = Todo.find(params[:id])
  @todo.destroy
  {delete_content: @todo.id}.to_json
end

