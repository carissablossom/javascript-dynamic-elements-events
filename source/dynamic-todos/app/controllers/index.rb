get '/' do
  erb :index
end

post '/add_todo' do
  new_todo = Todo.new(todo_content: params[:content])
  
  if new_todo.save
  p "*" * 100
  p new_todo.id
  p "*" * 100
  	return {content: new_todo.todo_content, todo_id: new_todo.id}.to_json
  else
  	erb :index
  end
end

delete '/delete_todo' do
  todo = Todo.where(todo_content: params[:todo]).first
	todo.destroy()

	return { todo_id: todo.id, todo_name: todo.todo_content }.to_json
end

post '/complete_todo' do
	p "*" * 100
	p 'in complete todo'
	p params
	p "*" * 100

	todo = Todo.where(todo_content: params[:todo]).first

	return { todo_id: todo.id, todo_name: todo.todo_content }.to_json


end
