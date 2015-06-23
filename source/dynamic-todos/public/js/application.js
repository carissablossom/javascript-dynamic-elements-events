$(document).ready(function() {
  bindEvents();
});


function bindEvents() {
  // Bind functions which add, remove, and complete todos to the appropriate
  // elements
  $(':submit').on("click", function(event){
    event.preventDefault();

    var path = $(this).parents().attr('action');
    var item = $('.todo').val()

    var request = $.ajax({
      url: path,
      type: "POST",
      data: {content: item},
    });
    request.done(function(response){
      endContent = buildTodo(response.content);
      $('.todo_list').append(endContent);
    });
    request.fail(function(response){
      console.log("FAIL");
    });
  });

  $('.todo_list').on("click", ".delete", function(event){
    event.preventDefault();
    var path = $(this).attr('href');
    var request = $.ajax({
      url: path,
      type: "delete",
      data:
    })
    request.done(function(response){
      console.log(response);
      debugger
      console.log("SUCCESS!!");
      console.log(response.delete_content)
      $('a[href$=' + response.delete_content + ']').parent().parent().parent().detach();
    })
    request.fail(function(response){
      console.log(response);
      console.log("FAIL");
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
