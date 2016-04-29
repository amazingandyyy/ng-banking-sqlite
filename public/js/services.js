'use strict';

var app = angular.module('myApp');

// all services and factories

app.service('db', function($http) {
    // manage all record api calls
    this.getAll = () => {
        return $http.get('/api');
    }
    this.create = (record) => {
        return $http.post('/api', record);
    }
    this.update = (edittedRecord) => {
        return $http.put('/api', edittedRecord);
    }
    this.delete = (record) => {
        return $http.delete(`/api/${record.id}`);
    }



});
