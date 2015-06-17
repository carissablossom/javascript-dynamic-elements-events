get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  # p "Inside /add_todo route!"
  p "in the controller"
  @todo = Todo.new(todo_content: params[:content])
  if @todo.save
  	{content: @todo.todo_content}.to_json # convert to json - js object
  end
end

=begin
$("list").on("click", function(e){
	e.preventDefault();
	var request = $.ajax({
		url: "/lists",
		type: "GET",    # method is the same as get
	})

request.done(function(response){
	$("footer").append("<div>")
})
=end

