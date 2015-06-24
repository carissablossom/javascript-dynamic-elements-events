$(document).ready(function() {
  bindEvents();
});

function bindEvents() {
  addTodo();
  deleteTodo();
};



function deleteTodo(){
  $('.todo_list').on('click', '.delete', function(event){

    event.preventDefault();

    var task = $(event.target).closest('div').attr('id')

    var path = 'todo/' + task




    var request = $.ajax({
      url: path,
      type: "delete",
      data: {id: task},
      dataType: 'json'
    })

    request.done(function(response){
      $('#'+task).fadeOut()
      console.log(task)
      console.log('pass')

    });

    request.fail(function(response){
      console.log('fail')
    });

  });
}

function addTodo() {

  $('#todo').on('click', '#create-todo', function(event){
    event.preventDefault();

    var action = $('#todo-form').attr('action');
    var method = $('#todo-form').attr('method');
    var item = $('.todo').val();
    console.log("tofu");

    var request = $.ajax({
      url: action,
      type: method,
      data: {content: item},
      dataType: 'JSON'
    });

    request.done(function(response){
      console.log("success");
      console.log(response);
      var finalContent = buildTodo(response['content']);
      $('.todo_list').append(finalContent)
      $('.todo').val('')
    });

    request.fail(function(response){
      console.log("Fail")
      console.log(response);
    })
  });
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
