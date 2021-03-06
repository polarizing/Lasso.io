app.directive('toggleCheckbox', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/toggle-checkbox/toggle-checkbox.html',
        scope: { data: '=data', model: '=ngModel', options: '='},
        controller: function ($scope) {

            $scope.checked = $scope.data.checked;
            $scope.unchecked = $scope.data.unchecked;
            $scope.current = $scope.unchecked;

            $scope.toggleChecked = function () {
                $scope.current = ($scope.unchecked === $scope.current) ? $scope.current = $scope.checked : $scope.current = $scope.unchecked;
                $scope.model = $scope.current;
            }


        }
    };

});
