$(document).ready(function() {
  bindEvents();
});


function bindEvents() {
  $('#todo').on('click', '#create-todo', function(e){ //<--- the #todo will make it so the form sees every single click that happens. the #create-todo sets which clicks should be reacted to
    e.preventDefault();
    var action = $('#todo-form').attr('action'); //<-- calling the action of the existing form
    var method = $('#todo-form').attr('method'); //<-- calling the method of the existing form
    var item = $('.todo').val(); //<-- calling the method of the existing form
    console.log("wer're clicking submit and preventing default");
    console.log(action);

    var request = $.ajax({
      url: action,
      type: method,
      data: {content: item}, //<--- content is the key. key needs to match key in params passed in post route.
      dataType: 'JSON' //<--- you can send any type of string. Best habit is to just deal with it in JSON.
    });

    request.done(function(response){
      console.log("Success")
      console.log(response);
      console.log(response['content']);
      var finalContent = buildTodo(response['content']); //<-- response is just a Json hash
      $('.todo_list').append(finalContent) //<-- adding the new todo to our HTML
      $('.todo').val('') //<-- clearing the field after appending
    });

    request.fail(function(response){
      console.log("FAIL")
      console.log(response);
    });
  });
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
