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

    $('#todo').on('click', '.deleteBTN', function(e){
      e.preventDefault();
      var todoItemID = $(this).parents('.todo').attr('id')
      deleteTodo(todoItemID);
    });

    $('#todo').on('click', '.completeBTN', function (e) {
      e.preventDefault();
      var todoItemID = $(this).parents('.todo').attr('id')
      completeTodo(todoItemID);
    });

  }

  //Create functions to add, remove and complete todos

  function removeDOM(item) {
    var domElement = $('#'+item+'.todo')
    domElement.remove();
  };


  function appendDOM(item) {
    console.log(item);
    var todo = buildTodo(item.todo);
    $('#todo').append(todo);
  };


  function completeDOM(item) {
    var todoDOM = $('#todo #'+item.id)
    console.log(item);
    var updatedTodo = buildTodo(item)

    console.log(todo);
    todoDOM.replaceWith(updatedTodo);
  };


  function buildTodo(todoObj) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    var todoText = $todo.find('h2')
    todoText.text(todoObj.todo_content);
    $todo.attr('id', todoObj.id);
    if(todoObj.completed === true){
      var checkImg = "<img class='done_mark' src='http://files.spazioweb.it/aruba35005/image/jobdone.jpg'>";
      todoText.append(checkImg);
      $todo.addClass('complete');
      todoText.after('<p>Completed at: '+ todoObj.completed_at )
    }
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

  function completeTodo(item) {
    console.log("in complete ajax call");
    console.log(item);
    var request = $.ajax({
      url: "/todos/"+item,
      type: "PUT",
      data: { completed: "true" }
    });

    request.done(function(response){
      var res = JSON.parse(response);
      // console.log(res.todo);
      completeDOM(res.todo);
      console.log('ajax: complete: Done.');
    });

    request.fail(function(response){
      console.log(response);
      console.log('ajax: complete: Fail.');
    });

  }

  listAll();
  bindEvents();

});
