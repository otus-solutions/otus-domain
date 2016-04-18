(function() {
    'use strict';

    angular
        .module('user.management')
        .controller('UserActivationController', UserActivationController);

    UserActivationController.$inject = ['$http', '$scope', '$filter'];

    function UserActivationController($http, $scope, $filter) {

        $scope.users = [];
        $scope.users.disabledUsers = [];
        $scope.users.activedUsers = [];

        var HOSTNAME_REST = 'http://' + window.location.hostname;

        var URL_GET_USERS = HOSTNAME_REST + '/otus-domain-rest/session/rest/administration/users/fetch';
        var URL_DISABLE_USERS = HOSTNAME_REST + '/otus-domain-rest/session/rest/administration/users/disable';
        var URL_ENABLE_USERS = HOSTNAME_REST + '/otus-domain-rest/session/rest/administration/users/enable';

        var REPOSITORY_CREATE_ACTION = 'NEW';
        $scope.loadUsers = fetchUsers();

        $scope.enableUsers = function() {
            //pega os usuários desabilitados
            var disabledUserForActivation = filterSelected($scope.users.disabledUsers);
            // Se exister usuários desabilitados
            if (disabledUserForActivation.length > 0) {
                // solicita ao servidor que o usuário/usuários seja habilitado, passando como parâmetro o usuário(s)
                console.log(disabledUserForActivation);
                $http.post(URL_ENABLE_USERS, disabledUserForActivation).then(function(response) {
                    fetchUsers();
                });
            }
        };

        $scope.disableUsers = function() {
            var enableUserForDisable = filterSelected($scope.users.activedUsers);

            if (enableUserForDisable.length > 0) {
                $http.post(URL_DISABLE_USERS, enableUserForDisable).then(function(response) {
                    fetchUsers();
                });
            }
        };

        function filterSelected(users) {
            return ($filter('filter')(users, {
                selected: true
            }));
        }

        function fetchUsers() {
            $http.get(URL_GET_USERS).then(function(response) {
                $scope.users.disabledUsers = response.data.disabledUsers;
                $scope.users.activedUsers = response.data.activedUsers;
            });
        }
    }


}());
