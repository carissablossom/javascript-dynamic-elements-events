get '/' do
  @todos = Todo.all
  erb :index
end

post '/add_todo' do
  new_todo = Todo.new(todo_content: params[:content])

  if new_todo.save
  	return {content: new_todo.todo_content, id: new_todo.id}.to_json
  else
  	erb :index
  end
end

delete '/delete_todo' do
  todo = Todo.where(todo_content: params[:todo]).first
  todo.destroy()

  return {todo_name: todo.todo_content}.to_json
end

post '/complete_todo' do
	todo = Todo.where(todo_content: params[:todo]).first
  todo.completed = true
  todo.save

	return { todo_id: todo.id, todo_name: todo.todo_content, todo_status: todo.completed }.to_json
end
