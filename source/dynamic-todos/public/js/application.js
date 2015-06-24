$(document).ready(function() {
  bindEvents();
});


function bindEvents() {
  // Bind functions which add, remove, and complete todos to the appropriate
  // elements
  addToDoItem();
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
// A todo may be added to the page.

var addToDoItem = function() {
  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var data = form.serialize();

    $.ajax({
      url: '/add_todo',
      type: 'post',
      dataType: 'json',
      data: data
    })

    .done(function(response){
      console.log(response);
      var task = $('.todo h2').html(buildTodo(response.content));
      $('.todo_list').append(task);
    })

    .fail(function(response){
      console.log("addToDoItem(); failed.", response)
    });

  });
};

// A todo may be marked as complete.
// A todo may be removed from the page.
