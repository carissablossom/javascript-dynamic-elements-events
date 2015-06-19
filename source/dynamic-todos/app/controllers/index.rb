get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  @todo = Todo.new(todo_content: params[:content])
  if @todo.save
    {content: @todo.todo_content}.to_json
  end
end


