$(document).ready(function() {
  bindEvents();
});


function bindEvents() {
  // Bind functions which add, remove, and complete todos to the appropriate
  // elements

  //***ADD TODO***
  $('#add_todo').on('submit', function(event) {
    event.preventDefault();
    var $target = $(event.target);
    var task = $target.children().first().val();
    $.ajax({
      url: $target.attr('action'),
      type: $target.attr('method'),
      data: {todo_content: task},
      dataType: 'JSON'
    }).done(function(response) {
      console.log(response)
      console.log('working?')
      var $todo_copy = $('.todo_form').clone();
      console.log($todo_copy);
      console.log($todo_copy.children().first().html());
      console.log(response);
      $todo_copy.children().first().html(response.response);
      $('.todo_list').append($todo_copy);
    }).fail(function(response){
      alert("Error: " + response)
    })
  })

   //**DELETE TODO**
  $('.todo_list').on('click', '.delete', function(event) {
    event.preventDefault();
    var $target = $(event.target);
    console.log($target);
    var $task_div = $target.parent().parent().parent();
    var data =  $target.parent().parent().parent().find('h2').html();
    $.ajax({
      url: '/',
      type: 'DELETE',
      data: {todo_content: data},
      dataType: 'JSON'
    }).done(function(response){
      $task_div.hide(response);
    }).fail(function(response){
      alert(response);
    })
  })

  //***COMPLETE TODO***
  $('.todo_list').on('click', '.complete', function(event){
    event.preventDefault();
    var $target = $(event.target);
    var data =  $target.parent().parent().parent().find('h2').html();
    var $task_div = $target.parent().parent().parent();
    // var $task = $target.closest('div').find('h2');
    debugger
    $.ajax({
      url: '/',
      type: 'POST',
      data: {todo_content: data},
      dataType: 'JSON'
    }).done(function(response){
      console.log('done');
      $task_div.addClass('complete');
    }).fail(function(response){
      alert(response);
    })
  })

}




// function buildTodo(todoName) {
//   // gets todoTemplate stored in DOM.
//   var todoTemplate = $.trim($('#todo_template').html());
//   // Creates an jQueryDOMElement from the todoTemplate.
//   var $todo = $(todoTemplate);
//   // Modifies it's text to use the passed in todoName.
//   $todo.find('h2').text(todoName);
//   // Returns the jQueryDOMElement to be used elsewhere.
//   return $todo;
// }

//Create functions to add, remove and complete todos
