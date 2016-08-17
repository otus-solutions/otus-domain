(function() {
    'use strict';

    angular
        .module('user.management')
        .controller('UserActivationController', UserActivationController);

    UserActivationController.$inject = [
        '$http',
        '$scope',
        '$filter',
        'RestResourceService',
        'OtusRestResourceService',
        '$mdDialog',
        '$mdToast',
        'userManagementType'
    ];

    function UserActivationController($http, $scope, $filter, RestResourceService, OtusRestResourceService, $mdDialog, $mdToast, userManagementType) {
        var self = this;

        var DIALOG_TEXT_CONTENT = 'Você tem certeza que deseja alterar o status do usuário ?';
        var DIALOG_TITLE = 'Mudança de Estatus';
        var DIALOG_ARIA = 'Mudança de Status';
        var clientSelected = null;

        self.users = [];
        self.loadUsers = loadUsers;
        self.changeStatus = changeStatus;
        self.confirmDialog = confirmDialog;
        self.currentRestResourceService = null;

        _init();

        function _init() {
            if (userManagementType === 'domain') {
                clientSelected = RestResourceService;
            } else {
                clientSelected = OtusRestResourceService;
            }
            loadUsers();
        }

        function changeStatus(user) {
            if (!user.enable) {
                disable(user);
            } else {
                enable(user);
            }
        }

        function confirmDialog(user) {
            var dialog = $mdDialog.confirm()
                .title(DIALOG_TITLE)
                .textContent(DIALOG_TEXT_CONTENT)
                .ariaLabel(DIALOG_ARIA)
                .ok('Sim')
                .cancel('Cancelar');

            $mdDialog.show(dialog).then(function() {
                changeStatus(user);
            }, function() {
                user.enable = !user.enable;
            });
        }

        function enable(user) {
            var userResource = clientSelected.getUserResource();
            userResource.enable(user, function() {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Usuário habilitado.')
                );

                loadUsers();
            });
        }

        function disable(user) {
            var userResource = clientSelected.getUserResource();
            userResource.disable(user, function() {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Usuário desabilitado.')
                );

                loadUsers();
            });
        }

        function loadUsers() {
            var userResource = clientSelected.getUserResource();
            userResource.fetch(function(response) {
                $scope.users = response.data;
            });
        }
    }
}());
