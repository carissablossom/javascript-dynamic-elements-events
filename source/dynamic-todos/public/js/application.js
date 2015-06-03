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

  }

  //Create functions to add, remove and complete todos

  function appendDOM(item) {
    var todo = buildTodo(item.todo.todo_content);
    $('#todo').append(todo);
  }

  function buildTodo(todoName) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoName);
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }

  function ajaxGetAllTodos() {
    var request = $.ajax({
      url: "/todos",
      type: "GET"
    });

    var results = request.done(function(response){
      // console.log("Get all: Done.");
      return response;
    });

    request.fail(function(response){
      console.log("Get all: FAILED.");
      console.log(response);
    });

    return results;

  }

  function listAll() {

    // var promise = new Promise( function(resolve,reject){
    //   var request = ajaxGetAllTodos();

    //   console.log("request");
    //   console.log(request);
    //   return request;
    // });
    // promise.then(function(data){

    //   console.log('done');
    //   console.log(data);
    // }, function(error){

    //   console.log('done fucked up');
    // });

    // demonstration of promises in async ENV
    console.log("async: before")

    var todoPromise = ajaxGetAllTodos();

    // This will print before the async functions has finished
    console.log("async: ongoing")

    todoPromise.then(function(result){

      console.log("async: result");
      var res = JSON.parse(result);
      processTodos(res);
    })

    // This will print before the async functions has finished
    console.log("async: after")
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

  function processTodos(items) {
    var length = items.length
    for(var i = 0; i < length; i += 1) {
      // console.log('proccessing')
      // console.log(items[i])
      appendDOM(items[i]);
    }
  };


  bindEvents();
});
