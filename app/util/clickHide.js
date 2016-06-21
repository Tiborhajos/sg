angular.module("spacegame")
    .directive('clickHide', function ($parse, $document) {
        var dir = {
            compile: function ($element, attr) {
                // Parse the expression to be executed
                // whenever a click occurs anywhere but on this element.
                var fn = $parse(attr["clickHide"]);
                return function (scope, element, attr) {
                    // add a click handler to the element that stops the event propagation.
                    element.bind("click", function (event) {
                        event.stopPropagation();
                    });
                    angular.element($document[0].body).bind("click", function (event) {
                        scope.$apply(function () {
                            fn(scope, {$event: event});
                        });
                    });
                };
            }
        };
        console.log('this');
        return dir;
    });