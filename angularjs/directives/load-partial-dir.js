(function () {

    angular.module('treeze.directives.loadPartial',['ngSanitize'])

    .directive("loadPartial", function($http, $compile, $timeout) {
        return{
            restrict: 'E',
            scope: {
                        partial: "@"
            },
            link: function(scope, element){
                $http({
                    method: 'GET',
                    url: globalPath + '/partials/' + scope.partial
                }).then(function successCallback(response) {

                    var template = response.data;
                    var linkFn = $compile(template);
                    var content = linkFn(scope);
                    element.append(content);
                    forceTranslate();

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
                function forceTranslate (){
                    $timeout(function () {
                        $(document).i18n();
                    });
                }
            },
            replace: true,
            transclude: true
        }
    });

}());



