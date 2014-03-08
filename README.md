# P8 JavaScript Dynamic Elements And Events

## Learning Competencies

* Use jQuery to implement Event Delegation with the `on` function
* Separate my view concerns from my data verification concerns
* Use AJAX to retrieve partials from the server and replace or append them to a website
* Use AJAX to retrieve JSON from the server and then modify the page based on the JSON
* Use MustacheJS or Underscore template libraries to convert JSON to HTML

## Summary

Understanding how to bind and handle events is a core part of being a web
developer. This challenge tasks you to take a reasonably well factored
JavaScript application and extend it to include event bindings. Some of the
good practices you'll see in the provided code are:

1. Using templates in HTML to add elements.
1. Using functions to scope variables (i.e. todoTemplate is accessible within buildTodo, but not in the global scope. [Why?][scope])
1. Using functions to do only one thing (i.e. building the Todo DOM Element vs building the element and adding it to the list)

This should provide you with a solid foundation to complete the remaining features.

## Releases

This challenge requires you to manipulate objects that have been added
dynamically. You may want to brush up on [Event Delegation][event-delegation].

### Release 0 : Up and Running

Verify that the existing application runs before modifying.  Then add the following features:

1. A todo may be added to the page.
1. A todo may be marked as complete.
1. A todo may be removed from the page.

This challenge is meant to test your ability to consider how to engineer
complex front-end code.  While a series of bindings applied at `document.ready`
might _seem_ a reasonable approach, this challenge is (perhaps surprisingly)
difficult and will quickly become unworkable if you don't bring better
abstractions into play.  It is worth considering your approach before you begin
typing.

You may take a variety of approaches in solving this problem.  One possible
approach would be to create named functions and bind them to the appropriate
buttons.  Another, _better_, approach would be to come up with an
object-oriented solution where `Todo` instances are synchronized to the
back-end via Ajax and then added / changed / deleted on the front end.  For
those who want to really stretch themselves, consider trying to implement your
own MVC paradigm.

### Release 1 : Drag and Drop

When creating lists, you often want to reorder them.  jQuery UI provides a
convenient means for implementing this.  Consider their [draggable][] and
[droppable][] libraries.

For a worthy, but optional, stretch, consider implementing drag and drop
natively with [HTML5 Drag and
Drop](http://www.html5rocks.com/en/tutorials/dnd/basics/).  If you choose this
stretch, timebox the effort!

### Release 2 : Using Template Code

The initial template provided is HTML based.  Managing HTML templates is
difficult and can be significantly streamlined by using a JavaScript template
like Mustache.js.  Try using a JavaScript template.  You needn't put the
**whole** application into a JavaScript template but rather just the Todo
representation.

## Resources

* [Event Delegation][event-delegation]
* [JavaScript scope][scope]
* [jQuery draggable][draggable]
* [jQuery droppable][droppable]

[event-delegation]: http://davidwalsh.name/event-delegate
[scope]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FFunctions_and_function_scope
[draggable]: https://jqueryui.com/draggable/
[droppable]: https://jqueryui.com/droppable/
