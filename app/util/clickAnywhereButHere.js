angular.module("spacegame")
    .factory('clickAnywhereButHereService', function($document){
    var tracker = [];

    return function($scope, expr) {
        var i;
        var t;
        var length;
        for(i = 0, length = tracker.length; i < length; i++) {
            t = tracker[i];
            if(t.expr === expr && t.scope === $scope) {
                return t;
            }
        }

        var handler = function() {
            $scope.$apply(expr);
        };

        $document.on('click', handler);

        // IMPORTANT! Tear down this event handler when the scope is destroyed.
        $scope.$on('$destroy', function(){
            $document.off('click', handler);
        });

        t = { scope: $scope, expr: expr };
        tracker.push(t);
        return t;
    };
});

angular.module("spacegame")
    .directive('clickAnywhereButHere', function($document, clickAnywhereButHereService){
    return {
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            console.log('init');
            var handler = function(e) {
                e.stopPropagation();
            };
            elem.on('click', handler);

            scope.$on('$destroy', function(){
                elem.off('click', handler);
            });

            clickAnywhereButHereService(scope, attr.clickAnywhereButHere);
        }
    };
});