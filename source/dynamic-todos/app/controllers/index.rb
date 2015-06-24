get '/' do
  # Look in app/views/index.erb
  @todo_list = Todo.all
  erb :index
end

post '/add_todo' do
  p params.inspect
  p "Inside the post/add_todo route!"
  @todo = Todo.new(todo_content: params[:content])
  if @todo.save
    {content: @todo.todo_content}.to_json
  else
    console.log('fail: ', @todo)
  end
end

delete "/todo/:id" do
  content_type :json
  @todo = Todo.find(params[:id])
  @todo.destroy
end
