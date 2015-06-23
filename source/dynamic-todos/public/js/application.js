$(document).ready(function() {
  bindEvents();



  $('.delete-task').on('click', function(event){
    event.preventDefault();
    var link = $(this);
    var note = link.closest('.note');
    var request = $.ajax({
      method: 'delete',
      url: link.attr('href'),
    });

    note.addClass('deleting');

    request.done(function(){
      note.fadeOut(function(){
        note.remove('slow');
      });
    });
  });

//ellis worked on this and not sure if works
  $('.update-task').on('click', function(event){
    event.preventDefault();
    var link = $(this);
    var note = link.closest('.note')
    var request = $.ajax({
      method: 'put',
      url: link.attr('href')
    });
    request.done(function(response){
      $('note status').html('response.status')
    })
  });

});


function bindEvents() {
  // Bind functions which add, remove, and complete todos to the appropriate
  // elements
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
