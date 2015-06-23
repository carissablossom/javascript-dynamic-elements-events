get '/' do
  # Look in app/views/index.erb
  @todos = Todo.all
  erb :index
end

post '/add_todo' do
  p "Inside /add_todo route!"
  @todo = Todo.new(todo_content: params[:todotext])

  if @todo.save
    # redirect '/'
    # h = {id: @todo.id, todo_content: todo.todo_content}.to_json
    # returns to the ajax call
  else
    status 500
  end

end

