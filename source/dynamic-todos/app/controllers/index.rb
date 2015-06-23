get '/' do
  @notes = Todo.all# Look in app/views/index.erb
  erb :index
end

post '/todo' do
  @new_note = Todo.create(todo_content: params[:todo_content])
  redirect '/'
end



put '/todo/:id' do
  Todo.where(params[:id]).status = True

  redirect '/'
end

delete '/todo/:id' do
  Todo.find(params[:id]).destroy
end
