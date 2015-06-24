$(document).ready(function() {
  bindEvents();
}); //        |
    //        |
    //        |
    //        V
function bindEvents() {
  // Bind functions which add, remove, and complete todos to the appropriate
  // elements

  //=============================CREATE NEW TASK=============================

  $('form').on('submit', function(e) {
    e.preventDefault();       // <---------- make sure to prevent the page
                              // from performing the default action

    var path = "/add_todo";   // <----- corresponds to '/add_todo' POST route in the controller (index.rb)
    var task = ".todo";       // <----- corresponds to <input></input> field of your todo form with
                              // the'todo' class in your index.erb view. Now, 'task' contains your new task
                              // (your input from the form). This gets passed as a part of the ajax request
                                   //             |
                                   //             |
    var ajaxRequest = $.ajax({     //             |
      url: path,                   //             |
      method: 'POST',              //             |
      dataType: 'JSON',            //             |
      data: {task_content: task}   // <------------
    });
    //         |
    //         |
    //         |-------------------------------------------------------------------------------
    //                                                                                        |
    ajaxRequest.done(function(response) {   // Gets called if Ajax request passes (200) <-----|
      var newTask = buildTodo(response.task, response.id)  //                                 |
      $('.todo_list').append(buildTask);                   //                                 |
    });                                                    //                                 |
                                                           //                                 |
    ajaxRequest.fail(functions(response) {  // Gets called if Ajax request fails (404) <------|
      console.log("NOPE");
      alert("NA-UHH FOOL");
    });
  });


  //=============================DELETE TASK=================================
  $('.todo_list').on('click', 'a.delete', function(e) {
    e.preventDefault();

    var getId = $(this).first().parent().parent().attr('id'); //<------ how does this work?
    var path = '/' + getId;

    var request = .ajax({
      url: path,
      method: 'DELETE',
      dataType: 'JSON',
      data: {id: getId}
    });

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
