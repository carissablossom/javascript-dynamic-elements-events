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

delete '/delete' do

  p "/" * 100
	p 'in delete todo'
	p params
  p todo = Todo.where(todo_content: params[:todo]).first
  p "/" * 100

	todo.destroy()
	return { todo_id: todo.id, todo_name: todo.todo_content }.to_json
end

