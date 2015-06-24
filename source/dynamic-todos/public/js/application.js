$(document).ready(function() {
  bindEvents();
});


function bindEvents() {
  // Bind functions which add, remove, and complete todos to the appropriate
  // elements
  $('.toolbox').on("submit", function(event){
    event.preventDefault();

    var path = $(this).children('form').attr('action')
    var form = $(this).children('form')



    var request = $.ajax({
      url: path,
      type: "POST",
      data: form.serialize()
    })

    request.done(function(response){
      console.log(response);
      $('.todo_list').append(response)
    })

    request.fail(function(response){
      console.log(response);
    })
  })

  $('.complete').on("click",  function(event){
    event.preventDefault();

    var path = $(this).closest('div').attr('id')

    var request = $.ajax({
      url: path,
      dataType: "JSON",
      type: "GET"
    })

    request.done(function(response){
      console.log($('div #'+response.todo+' li .complete'))
      // debugger
      $('div #'+response.todo+' li .complete').css("display", "none");
    })

    request.fail(function(response){
      console.log(response)
      console.log("fail")
    })


  })

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
