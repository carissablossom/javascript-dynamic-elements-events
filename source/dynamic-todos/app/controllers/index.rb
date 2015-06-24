get '/' do

  @todos = Todo.all

  erb :index
end

post '/add_todo' do
  p params
  todo = Todo.new(todo_content: params[:todo_content])
  p todo
  if todo.save
    p 'in save'
    p todo
    erb :_todos, layout: false, locals: {todo: todo}
  else
    status 500
  end
end

get '/:todo_id' do
  todo = Todo.find(params[:todo_id])
  todo.update_attributes(completed: true)

  p todo
  {todo: todo.id}.to_json

end
