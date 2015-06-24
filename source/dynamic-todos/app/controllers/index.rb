get '/' do
  @todos = Todo.all
  erb :index
end

post '/add_todo' do
  @todo = Todo.create(
    todo_content: params[:todo_content])
  # p "Inside /add_todo route!"
end

# A todo may be added to the page.
# A todo may be marked as complete.
# A todo may be removed from the page.
