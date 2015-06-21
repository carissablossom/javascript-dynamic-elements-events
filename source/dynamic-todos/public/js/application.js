$(document).ready(function() {
  bindEvents();
});



function bindEvents() {
  // Bind functions which add, remove, and complete todos to the appropriate
  // elements
  $('form').on('submit', function(event){
    event.preventDefault();

    var path = '/add_todo';
    var note = $('.todo').val();

    var request = $.ajax({
      url: path,
      type: "POST",
      dataType: 'JSON',
      data: {content: note}
    });

    request.done(function(response){

      var newTodo = buildTodo(response.name, response.id);
      $('.todo_list').append(newTodo);
    });

    request.fail(function(response){
      console.log("failed");
      alert("failed1");
    });
  });

  $('.todo_list').on("click", "a.delete", function(event){
    event.preventDefault();

    var thisId = $(this).first().parent().parent().parent().attr('id');
    var path = "/"+thisId;

    var request = $.ajax({
      url: path,
      dataType: 'JSON',
      type: "DELETE",
      data: {id: thisId}
    });

    request.done(function(response){
      $('#'+thisId).remove();
    });

    request.fail(function(response){
      console.log("fail");
      alert("fail2");
    });
  });

  $('.todo_list').on("click", "a.complete", function(event){
    event.preventDefault();

    var thisId = $(this).first().parent().parent().parent().attr('id');
    var path = "/"+thisId;

    var request = $.ajax({
      url: path,
      dataType: 'JSON',
      type: "POST",
      data: {id: thisId}
    });

    request.done(function(response){
      console.log("done");
      $('#'+thisId).addClass('complete');
    });

    request.fail(function(response){
      console.log("fail");
      alert("fail3");
    });
  });
};

function buildTodo(todoName, id) {
  // gets todoTemplate stored in DOM.
  var todoTemplate = $.trim($('#todo_template').html());
  // Creates an jQueryDOMElement from the todoTemplate.
  var $todo = $(todoTemplate);
  // Modifies it's text to use the passed in todoName.
  $todo.find('h2').text(todoName);
  // Returns the jQueryDOMElement to be used elsewhere.
  $todo.attr('id', ''+id);
  return $todo;
};

//Create functions to add, remove and complete todos
