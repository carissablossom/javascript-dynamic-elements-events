get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  p "Inside /add_todo route!"
  @task = Todo.new(todo_content: params[:todo])
  if @task.save
    # content_type :json
    return {task: @task.todo_content, id: @task.id}.to_json
  else
    p "post failed"
  end
end

delete '/:id' do
  @id = params[:id]
  @task = Todo.find(@id);
  @task.destroy
  return {id: @id}.to_json
end

post '/:id' do
  @id = params[:id]
  @task = Todo.find(@id)
  @task.completed = true
  @task.save
  return {id: @id}.to_json
end

