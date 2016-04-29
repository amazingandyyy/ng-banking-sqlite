'use strict';
var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, db) {

    db.getAll()
        .then(res => {
            $scope.records = res.data;
            console.log("$scope.records: ", $scope.records)
        })
        .catch(err => {
            console.log('err:', err);
        });

    $scope.addRecord = () => {
        db.create($scope.newRecord)
            .then(res => {
                console.log('res: ', res);
                var record = res.data;
                $scope.records.push(record);
                $scope.newRecord = null;
                // console.log();
            })
            .catch(err => {
                console.error(err);
            });
    }

    $scope.removeRecord = (record) => {
        db.delete(record)
            .then(res => {
                var index = $scope.records.indexOf(record);
                $scope.records.splice(index, 1);
                console.log('yeah');
            })
            .catch(err => {
                console.error(err);
            });

    }

    $scope.sortBy = (order) => {
        if ($scope.order === order) {
            $scope.order = `-${order}`;
            document.getElementById(`${order}Scaret`).style.transform = "rotate(0deg)";
        } else {
            $scope.order = order;
            document.getElementById(`${order}Scaret`).style.transform = "rotate(180deg)";

        }
    }

    $scope.getBalence = () => {
        return Math.round(($scope.getCreditsTotal() - $scope.getDebitsTotal()) * 100) / 100;
    }
    $scope.getDebitsTotal = () => {
            var total = 0;
            $scope.records.forEach(record => {
                total += record.debits || 0;
            })
            return Math.round(total * 100) / 100;
        }

    $scope.getCreditsTotal = () => {
        var total = 0;
        $scope.records.forEach(record => {
            total += record.credits || 0;
        })
        return Math.round(total * 100) / 100;
    }
    $scope.getTotal = (items) => {
        var total = 0;
        for (var i = 0; i < $scope.records.length; i++) {
            total += $scope.records[i].items;
        }
        return total;
    }

    var edittingIndex;

    $scope.editRecord = (record) => {
        edittingIndex = $scope.records.indexOf(record);
        $scope.edittedRecord = angular.copy(record); // we don't bind
        $scope.edittedRecord.date = new Date(record.date);
    }
    $scope.saveEdit = () => {
        db.update($scope.edittedRecord)
            .then(res => {
                console.log('res: ', res);
                $scope.records[edittingIndex] = $scope.edittedRecord;
                $scope.edittedRecord = null;
            })
            .catch(err => {
                console.error(err);
            });
    }
    $scope.cancelEdit = () => {
        $scope.edittedRecord = null;
    }


});
