get '/' do
  # Look in app/views/index.erb
  @list = Todo.all
  erb :index
end

post '/add_todo' do
  p "Inside /add_todo route!"
  if request.xhr?
    @todo = Todo.new(todo_content: params[:todo_content])
    if @todo.save
      {response: @todo.todo_content}.to_json
    else
      p "ERROR"
    end
  else
    "i'm not ajax"
  end
end

delete '/' do
  todo = Todo.where(todo_content: params[:todo_content]).first
  p todo
  Todo.destroy(todo.id)
  {content: todo.todo_content}.to_json
end

post '/' do
  todo = Todo.where(todo_content: params[:todo_content]).first
  todo.completed = true
  {content: todo.completed}.to_json
end