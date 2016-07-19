(function() {

    angular.module('treeze.lib.angularjs.controllers', ['ui.bootstrap'])
        
    .controller('DateFromCtrl', function ($scope) {
    $scope.today = function () {
        $scope.filtroGeral.DateFrom = new Date();
    };

    $scope.clear = function () {
        $scope.filtroGeral.DateFrom = null;
    };

    $scope.open = function ($event) {
        $scope.status.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd/MM/yyyy'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];
    })
    .controller('DateToCtrl', function ($scope) {

    $scope.today = function () {
        $scope.filtroGeral.DateTo = new Date();
    };


    $scope.clear = function () {
        $scope.filtroGeral.DateTo = null;
    };

    $scope.open = function ($event) {
        $scope.status.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd/MM/yyyy'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];
});

})();