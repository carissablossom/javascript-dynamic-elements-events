get '/' do
  @todos = Todo.all
  erb :index
end

post '/add_todo' do
  todo = Todo.new(todo_content: params[:todo_content])

  if todo.save
    return {id: todo.id, content: todo.todo_content}.to_json
  else
    erb :index
  end
  # p "Inside /add_todo route!"
end

# A todo may be added to the page.
# A todo may be marked as complete.
# A todo may be removed from the page.
