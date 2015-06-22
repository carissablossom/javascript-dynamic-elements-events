get '/' do
  # Look in app/views/index.erb
  @todo = Todo.all
  erb :index
end

#add
post '/todo' do
  todo = Todo.new(todo_content: params[:content])
  if todo.save
    {todo_content: todo.todo_content}.to_json
  end
end

#delete
delete '/todo/:id' do
 todo = Todo.find(params[:id])
 if todo.destroy
  content_type :json
  {}.to_json
 end
end

#complete
post '/:id' do
  todo = Todo.find(params[:id])
  todo.completed = true
  todo.save
  return {completed: true}.to_json
end
