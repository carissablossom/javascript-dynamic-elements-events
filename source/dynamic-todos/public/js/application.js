$(document).ready(function() {
  bindEvents();
});


function bindEvents() {
  
  // var addToDoButtonListener
  $('#add-todo-button').on('click', function(event) {
    event.preventDefault();

    var route = $('#add-todo-form').attr('action');
    var method = $('#add-todo-form').attr('method')

    var todo_data = $('.todo').val()

    debugger

    var request = $.ajax({
      url: route,
      type: method,
      dataType: 'json',
      data: {content: todo_data}
    })

    request.done(function(response) {
      console.log('SUCCESS', response)

      $('.todo_list').append('<li>' + response.content + '</li>');
      $('.todo').val('');
    })

    request.fail(function(response) {
      console.log('FAIL', response)
    })

  })

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
