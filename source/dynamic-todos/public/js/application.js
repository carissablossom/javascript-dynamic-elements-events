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

    $('.allBTN').on('click', function(e) {
      e.preventDefault();
      listAll();
    })

    $('#addBTN').on('click', function(e){

      e.preventDefault();

      var newItemText = $(this).siblings().val();

      ajaxToDo(newItemText);

    });

    $('#todo').on('click', '.delete', function(e){
      e.preventDefault();
      var todoItemID = $(this).parents('.todo').attr('id')
      deleteTodo(todoItemID);
    })

  }

  //Create functions to add, remove and complete todos

  function removeDOM(item) {
    var domElement = $('#'+item+'.todo')
    domElement.remove();
  };


  function appendDOM(item) {
    var todo = buildTodo(item.todo.todo_content, item.todo.id);
    $('#todo').append(todo);
  };


  function buildTodo(todoName, todoID) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoName);
    $todo.attr('id', todoID);
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  };


  function ajaxGetAllTodos() {
    console.log('async: ajax: initialize')
    var request = $.ajax({
      url: "/todos",
      type: "GET"
    });

    var results = request.done(function(response){
      console.log("async: ajax: Get all: Done.");
      return response;
    });

    request.fail(function(response){
      console.log("async: Get all: FAILED.");
      console.log(response);
    });

    return results;

  };


  function listAll() {

    // demonstration of promises in async ENV
    console.log("async: top code")

    var todoPromise = ajaxGetAllTodos();

    // This will print before the async functions has finished
    console.log("async: middle code")

    todoPromise.then(function(result){
      // We want to call this function after ajax success
      processTodos(result);
      console.log("async: block should execute after");
    })

    // This will print before the async functions has finished
    console.log("async: bottom code")
  };


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


  function processTodos(response) {
    var items = JSON.parse(response);
    var length = items.length
    for(var i = 0; i < length; i += 1) {
      // console.log('proccessing')
      // console.log(items[i])
      appendDOM(items[i]);
    }
  };


  function deleteTodo(item) {
    console.log('Delete: ');
    console.log(item);

    var request = $.ajax({
      url: "/todos",
      type: "DELETE",
      data: { id: item }
    })

    request.done(function(response){
      console.log('Delete: done');
      console.log(response);

      removeDOM(item);
    });

    request.fail(function(response){
      console.log('Delete: fail');
      console.log(response);
    });
  };


  bindEvents();

});
