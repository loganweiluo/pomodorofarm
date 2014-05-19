angular.module('pomodoroFarm', [])
    .controller('timerController', ['$scope', '$timeout', function ($scope, $timeout) {
        var pomodoroInSec = 25 * 60;
        var shortBreakInSec = 5 * 60;
        var longBreakInSec = 15 * 60;

        $scope.secToDisplayValue = function (sec) {
            var minutes = Math.floor(sec / 60);
            var seconds = sec % 60;
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            return minutes + ':' + seconds;
        };

        $scope.resetDisplay = function (timeInSec) {
            $scope.time = timeInSec;
        };

        $scope.isInTimer = false;
        $scope.resetDisplay(pomodoroInSec);

        $scope.onTimeOut = function () {
            $scope.time--;
            if ($scope.time > 0) {
                $scope.myTimeout = $timeout($scope.onTimeOut, 1000);
            }
        };

        $scope.startTimer = function (timeInSec) {
            $scope.cancelPomodoro(timeInSec);
            $scope.isInTimer = true;
            $scope.myTimeout = $timeout($scope.onTimeOut, 1000);
        };

        $scope.startPomodoro = function () {
            $scope.startTimer(pomodoroInSec);
        };

        $scope.startShortBreak = function () {
            $scope.startTimer(shortBreakInSec);
        };

        $scope.startLongBreak = function () {
            $scope.startTimer(longBreakInSec);
        };

        $scope.cancelPomodoro = function (timeToResetInSec) {
            if (!timeToResetInSec) {
                timeToResetInSec = pomodoroInSec;
            }
            if ($scope.isInTimer) {
                $scope.isInTimer = false;
                $timeout.cancel($scope.myTimeout);
            }
            $scope.resetDisplay(timeToResetInSec);
        };


    }]);
