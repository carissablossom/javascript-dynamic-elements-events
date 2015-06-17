$(document).ready(function() {
  bindEvents();
});


function bindEvents() {
  // Bind functions which add, remove, and complete todos to the appropriate
  // elements
  $('#todo').on('click', '#create-todo', function(e){
    e.preventDefault();
    var action = $('#todo-form').attr('action');
    var method = $('#todo-form').attr('method');
    // var href = $('#todo-form').attr('href');
    var item = $('.todo').val();

    // console.log("before json")
    var request = $.ajax({
      url: action,
      type: method,
      data: {content: item},
      dataType: 'JSON'
    })
    request.done(function(response){
      // console.log("in the response")
      console.log(response);
      // console.log(response['content']) => "todo item"
      var finalContent = buildTodo(response['content']);
      $('.todo_list').prepend(finalContent);
      $('.todo').val('');

    });
    request.fail(function(response){
      alert("FAIL");
    });
  })
    // console.log("all done") => 1

}

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
