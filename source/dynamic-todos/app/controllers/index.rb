get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  new_todo = Todo.new(todo_content: params[:content])

  if new_todo.save
  	return {content: new_todo.todo_content}.to_json
  else
  	erb :index
  end
end

