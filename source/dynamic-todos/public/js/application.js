$(document).ready(function() {

  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    // elements


    // Tried to .serialize() but not quite there....
    // Something funky with null return

    // $("form.todo_form").on("submit", function(e){
    //   e.preventDefault();
    //   console.log($(this).serialize());
    //   debugger

    // })

    $('#addBTN').on('click', function(e){

      e.preventDefault();

      var newItemText = $(this).siblings().val();

      ajaxToDo(newItemText);

    });

  }

  //Create functions to add, remove and complete todos


  function appendDOM(item) {
    var todo = buildTodo(item.todo.todo_content);
    $('body').append(todo);
  }

  function buildTodo(todoName) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoName);
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }

  function ajaxToDo(item) {

    var request = $.ajax({
      url: "/add_todo",
      type: "POST",
      data: {todo_item: item}
    });

    request.done(function(response){
      var res = JSON.parse(response);
      appendDOM(res);
    });

    request.fail(function(response){
      console.log("Ohhhh nose!");
      console.log(response);
    });

  };


  bindEvents();
});
