// $(document).ready(function() {
//   bindEvents();
// }); //        |
//     //        |
//     //        |
//     //        V
// function bindEvents() {
//   // Bind functions which add, remove, and complete todos to the appropriate
//   // elements

//   //=============================CREATE NEW TASK=============================

//   $('form').on('submit', function(e) {
//     e.preventDefault();       // <---------- make sure to prevent the page
//                               // from performing the default action

//     var path = "/add_todo";   // <----- corresponds to '/add_todo' POST route in the controller (index.rb)
//     var task = ".todo";       // <----- corresponds to <input></input> field of your todo form with
//                               // the'todo' class in your index.erb view. Now, 'task' contains your new task
//                               // (your input from the form). This gets passed as a part of the ajax request
//                                    //             |
//                                    //             |
//     var ajaxRequest = $.ajax({     //             |
//       url: path,                   //             |
//       method: 'POST',              //             |
//       dataType: 'JSON',            //             |
//       data: {task_content: task}   // <------------
//     });
//     //         |
//     //         |
//     //         |-------------------------------------------------------------------------------
//     //                                                                                        |
//     ajaxRequest.done(function(response) {   // Gets called if Ajax request passes (200) <-----|
//       var newTask = buildTodo(response.task, response.id)  //                                 |
//       $('.todo_list').append(buildTask);                   //                                 |
//     });                                                    //                                 |
//                                                            //                                 |
//     ajaxRequest.fail(function(response) {  // Gets called if Ajax request fails (404)  <------|
//       console.log("task submission failed");
//       alert("task submission failed");
//     });
//   });


//   //=============================DELETE TASK=================================
//   $('.todo_list').on('click', 'a.delete', function(e) {
//     e.preventDefault();

//     var getId = $(this).first().parent().parent().attr('id'); //<------ how does this work?
//     var path = '/' + getId;

//     var request = $.ajax({
//       url: path,
//       method: 'DELETE',
//       dataType: 'JSON',
//       data: {id: getId}
//     });

//     request.done(function(response) {
//       $('#'+getId).remove();
//     });

//     request.fail(function(response) {
//       console.log("task deletion failed");
//       alert("task deletion failed");
//     }):
//   });

//   $('.todo_list').on('click', 'a.complete', function(e) {
//     e.preventDefault();

//     var getId = $(this).first().parent().parent().parent().attr('id');
//     var path = "/" + getId;

//     var request = $.ajax({
//       url: path,
//       dataType: 'JSON',
//       type: 'POST',
//       data: {id: getId}
//     });

//     request.done(function(response) {
//       console.log("task completion succeeded");
//       $('#' + getId).addClass('complete');
//     });

//     request.fail(function(response) {
//       console.log("task completion failed");
//       alert("task completion failed");
//     });
//   });
// };

// function buildTodo(todoName, id) {
//   // gets todoTemplate stored in DOM.
//   var todoTemplate = $.trim($('#todo_template').html());
//   // Creates an jQueryDOMElement from the todoTemplate.
//   var $todo = $(todoTemplate);
//   // Modifies it's text to use the passed in todoName.
//   $todo.find('h2').text(todoName);
//   // Returns the jQueryDOMElement to be used elsewhere.
//   $todo.attr('id', ''+id);
//   return $todo;
// };

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
      // $('.todo h2').html(newTodo);
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
  $todo.find('h2').html(todoName);
  // Returns the jQueryDOMElement to be used elsewhere.
  $todo.attr('id', ''+id);
  return $todo;
};
