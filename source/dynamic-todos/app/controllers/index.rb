get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  p "Inside /add_todo route!"
  @todo = Todo.new(todo_content: params[:content])
  if @todo.save
    return {name: @todo.todo_content, id: @todo.id}.to_json
  else
    p "failed"
  end
end

delete '/' do
  @id = params[:id]
  @todo = Todo.find(@id)
  @todo.destroy
  return {id: @id}.to_json
end
