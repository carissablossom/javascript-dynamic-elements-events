$(document).ready(function() {
  bindEvents();
});


function bindEvents() {

  // var addToDoButtonListener
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
      var todo_item = buildTodo(response)
      $('.todo_list').append(todo_item)
      $('.todo').val('');
    })

    request.fail(function(response) {
      console.log('FAIL', response)
    })

  })

  //var deleteToDoButtonListener
  $('.delete').on('click', function(event) {
    event.preventDefault();
    // var todoName = $('.todo_list').children().children().first().text()
    debugger

    // var request = $.ajax({
    //   url: '/delete_todo',
    //   type: 'delete',
    //   dataType: 'json',
    //   data: { todo: todoName }
    // })

    // request.done(function(response){
    //   console.log('SUCCESS', response)

    //   $(".todo_list").find("h2:contains("+response.todo_name+")").siblings().remove()
    //   $(".todo_list").find("h2:contains("+response.todo_name+")").remove()
    // })

    // request.fail(function(response){
    //   console.log('FAIL', response)
    // })
  })

  //var completeTodoButtonListener
  $('.todo_list').on('click', '.complete', function(event) {
    event.preventDefault();

    var todoName = $('.todo_list').children().children().first().text()

    var request = $.ajax({
      url: '/complete_todo',
      type: 'post',
      dataType: 'json',
      data: { todo: todoName }
    })

    request.done(function(response) {
      console.log('SUCCESS', response)
      $('.todo_list').find('h2:contains('+response.todo_name+')').siblings().children().last().text('COMPLETED!')
    debugger

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
