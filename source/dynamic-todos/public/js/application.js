$(document).ready(function() {
  // bindEvents();
  addToDoButtonListener();
  deleteToDoButtonListener();
  completeTodoButtonListener();
});


// function bindEvents() {

  var addToDoButtonListener = function() {
    $('#todo').on('click', '#add-todo-button', function(event) {
      event.preventDefault();

      var route = $('#add-todo-form').attr('action');
      var method = $('#add-todo-form').attr('method')
      var todo_data = $('.todo').val()

      var request = $.ajax({
        url: route,
        type: method,
        dataType: 'json',
        data: {content: todo_data}
      })

      request.done(function(response) {
        var todo_item = buildTodo(response.content)
        $('.todo_list').append(todo_item)
        $('.todo').val('');
      })

      request.fail(function(response) {
        console.log('FAIL', response)
      })

    })
  }
  var deleteToDoButtonListener = function() {
    $('#todo').on('click', '.delete', function(event) {
      event.preventDefault();

      var route = $(this).attr('href');
      var todo = $(this).closest('.todo');
      var todoName = $(todo).children().first().text()

      var request = $.ajax({
        url: route,
        type: 'delete',
        dataType: 'json',
        data: { todo: todoName }
      })

      request.done(function(response){
        $(".todo_list").find("h2:contains("+response.todo_name+")").closest('.todo').remove()
      })

      request.fail(function(response){
        console.log('FAIL', response)
      })
    })
  }

  var completeTodoButtonListener = function() {
    $('#todo').on('click', '.complete', function(event) {
      event.preventDefault();

      // debugger

      var route = $(this).attr('href');
      var todo = $(this).closest('.todo');
      var todoName = $(todo).children().first().text();

      var request = $.ajax({
        url: route,
        type: 'post',
        dataType: 'json',
        data: { todo: todoName }
      })

      request.done(function(response) {
        if (response.todo_status === true) {
          $('.todo_list').find('h2:contains('+response.todo_name+')').siblings().children().last().text("Completed!")
        }
      })

      request.fail(function(response) {
        console.log('FAIL', response)
      })
    })
  }
// }

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
