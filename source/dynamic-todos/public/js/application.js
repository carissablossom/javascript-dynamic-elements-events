$(document).ready(function() {
  bindEvents();
  deleteTodos();
});

// add
bindEvents = function() {
  $('#todo').on('click', '#create-todo', function(e){
    e.preventDefault();
    var action = $('#todo-form').attr('action');
    var method = $('#todo-form').attr('method');
    var item = $('.todo').val();
    var request = $.ajax({
      url: action,
      type: method,
      data: {content: item},
      dataType: 'json'
    });
    request.done(function(r){
      console.log('success!');
      var content = buildTodo(r['content']);
      $('.todo_list').append(content)
      $('.todo').val('')
    });

    request.fail(function(r){
      console.log('failed!');
    })
  });
}

//remove/delete
deleteTodos = function() {
  $('.delete').on('click', function(e) {

    e.preventDefault();
    var path = $(this).attr('href');
    var todo = $(this).closest('.todo');

    var request = $.ajax({
      method: "DELETE",
      url: path,
      dataType: "json"
    });

    request.done(function(r){
      console.log(r);
      console.log("deleted");
      todo.remove();
    });
  });
}

// complete (mark button as completed)
function completeTodos() {
  $('.complete').on('click', function(e){
    e.preventDefault();

    var todo = $(this).closest('.todo');
    var path = $(this).attr('href');

    var request = $.ajax({
      method: "POST",
      url: path,
      dataType: "json"
    });

    request.done(function(response){
      console.log(response);
      console.log('success??');
      todo.find('.complete').text(response.completed);
    })
  })

}

// button_click = function() { $('.vote-button').on('click', function(e) {
//   e.preventDefault();

//   var article = $(this).closest('article');
//   var path = $(this).attr('href');

//   var request = $.ajax({
//     method: 'POST',
//     url: path,
//     dataType: 'json'
//   });

//   request.done(function(response){
//     article.find('.points').text(response.vote_count);
//   });
//  });
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
