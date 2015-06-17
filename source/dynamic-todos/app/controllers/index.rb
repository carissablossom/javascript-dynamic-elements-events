# Ajax is the intermediary language
# Ajax is a method that comes along with Jquery
# Ajax effectively targets just very specific items to refresh.
# Ajax still runs the route
# Ajax gets the requested reponse and updates the DOM via Jquery
# Ajax allows live refreshing of javscript data but also a maintaining of state
# Json is just a hash. It's the universal language that serves as a common denominator
# remember passing around patrials for assessment
#
# Example of a request

# $('#list').on('click', function(e){
#   e.preventDefault();
#   var request = @.ajax({
#     url: "list",
#     type: "GET"
#     data: {key: value} #<-- this is equivilent of params
#     });

#   request.done(function(response){
#     $('footer').append("'<div>'response'</div>'")
#     console.lgo("success")
#     });

#   request.fail(function(response){
#     console.log(response)
#     console.log("you failed!")
#     });
#   });

#####################################################


get '/' do
  erb :index
end

post '/add_todo' do
  p "in the controller!"
  p params
  @todo = Todo.new(todo_content: params[:content])
  if @todo.save
    {content: @todo.todo_content}.to_json
  # else
  #   rerender page with erros
  end
end

