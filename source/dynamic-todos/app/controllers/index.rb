get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  p "Inside /add_todo route!"
  @task = Todo.new(params[:task])

  if @task.save
    content_type :json
    {task: @task, id: @task.id}.to_json
  else
    p "post failed"
  end
end

