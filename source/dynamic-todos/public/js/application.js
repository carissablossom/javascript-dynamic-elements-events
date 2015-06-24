$(document).ready(function() {
  bindEvents();
});

function bindEvents() {
  addTodo();
  deleteTodo();
  // Bind functions which add, remove, and complete todos to the appropriate
  // elements
};

var addTodo = function(){
  $('form').on("submit", function(event){
      event.preventDefault();
      // var form = $(this);
      // $('form') and it was giving :
      //[form, context: form]
      var form = $(this).serialize();
      var path = $(this).attr('action');
      var method = $(this).attr('method');
      //$('form').serialize() and it was giving:
      //content=whatever is inside the box
      // Serialize turns complex data (i.e. form) into a query string
      var request = $.ajax({
        url: path,
        type: method,
        dataType: 'json',
        data: form
      })
      request.done(function(response){
        console.log(response, "Success!");
        $('.todo_list').append(response);
      });
      request.fail(function(response){
        console.log(response);
      });
    });
};

var deleteTodo = function(){
  $('.todo_list').on("click", '.delete', function(event){
    event.preventDefault();
    var path = $(event.target)
    var task = $(event.target).closest("div").attr("id")
    // console.log(task);

    var request = $.ajax({
      url: $(path).attr("href"),
      type: $(path).attr("class"),
      data: {id: task}
    });
    request.done(function(response){
      console.log(response);
      console.log("success");
      $('#'+response.id).remove();
    });
    request.fail(function(response){
      console.log("fAIL");
      console.log(response.statusText);
    });
  });
};

function buildTodo(todoName) {
  // gets todoTemplate stored in DOM.
  var todoTemplate = $.trim($('#todo_template').html());
  // Creates an jQueryDOMElement from the todoTemplate.
  var $todo = $(todoTemplate);
  // Modifies it's text to use the passed in todoName.
  $todo.find('h2').text(todoName);
  // Returns the jQueryDOMElement to be used elsewhere.
  return $todo;
}

//Create functions to add, remove and complete todos
