get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  p params.inspect
  p "Inside the post/add_todo route!"
  @todo = Todo.new(todo_content: params[:content])
  if @todo.save
    {content: @todo.todo_content}.to_json
  end
end

