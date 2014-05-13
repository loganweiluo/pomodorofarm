angular.module('pomodoroFactory', [])
    .controller('timerController', ['$scope', '$timeout', function ($scope, $timeout) {
        var fullPomodoroInSec = 25 * 60;
        $scope.secToDisplayValue = function (sec) {
            var minutes = Math.floor(sec / 60);
            var seconds = sec % 60;
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            return minutes + ':' + seconds;
        };

        $scope.time = fullPomodoroInSec;
        $scope.displayTime = $scope.secToDisplayValue($scope.time);

        $scope.onTimeOut = function () {
            $scope.time--;
            $scope.displayTime = $scope.secToDisplayValue($scope.time);
            if ($scope.time > 0) {
                $timeout($scope.onTimeOut, 1000);
            }
        };


        $timeout($scope.onTimeOut, 1000);
    }]);
