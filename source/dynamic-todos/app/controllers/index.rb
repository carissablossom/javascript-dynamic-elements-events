get '/' do
  @all_todos = Todo.all
  erb :index
end

post '/todos' do
  p params
  todo = Todo.new(todo_content: params[:content])
  if todo.save
    # content_type :json
    # todo.to_json
    erb :'_todo_item', :locals => {:todo => todo }, layout: false
  else
    status 500
  end
end

put '/todos/:todo_id' do
  p "in put route"
  p params
  todo = Todo.where(id: params[:todo_id]).first
  p todo
  todo.completed = true
  if todo.save
    status 200
  else
    status 500
  end
end



delete '/todos/:todo_id' do
  Todo.find(params[:todo_id]).delete
end


