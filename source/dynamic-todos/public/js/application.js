$(document).ready(function() {
  $('.toolbox').on('submit', function(event){
    event.preventDefault();
    addTodoItem.call(this)
  });

  var todoList = $('.todo_list')

  todoList.on('click', '.delete', function(event){
    event.preventDefault()
    var parent = $(this).closest('div')
    var url = $(this).attr('href')
    var request = $.ajax({
      url: url,
      method: 'delete',
    });

    request.done(function(response){
      console.log(response)
      parent.remove()
    });

    request.fail(function(response){
      console.log(response)
    })
  });

  $('.todo_list').on('click', '.complete', function(event){
    event.preventDefault()
    var url = $(this).attr('href')
    var request = $.ajax({
      url: url,
      method: 'put',
    });

    request.done(function(response){
      console.log(response)
    });

    request.fail(function(response){
      console.log(response)
    })
  });



  var addTodoItem = function(){
    var form = $(this)
    var formInput = $(this).find('input[name=content]')
    var string = $(this).find('input[name=content]').val();
    var request = $.ajax({
      url: "/todos",
      method: "post",
      data: {content: string},
    });

    request.done(function(response){
      $('.todo_list').append(response)
      formInput.val('')
    })

    request.fail(function(response){
      debugger
    })
  };
});


// function bindEvents() {
//   // Bind functions which add, remove, and complete todos to the appropriate
//   // elements
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


