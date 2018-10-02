(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('surveyTemplateConfiguration', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/survey-template/survey-template-configuration-template.html',
      bindings: {
        surveyForm: '<',
        surveyTemplates: '='
      }
    });

  Controller.$inject = [
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    'UserManagerFactory',
    '$mdDialog',
    '$mdToast',
    'otusjs.model.activity.ActivityPermissionFactory',
    'DashboardStateService'
  ];

  function Controller(ProjectConfigurationService, UserManagerFactory, $mdDialog, $mdToast, ActivityPermissionFactory, DashboardStateService) {
    const ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
    var timeShowMsg = 5000;
    var _userManager;
    var _deleteConfirmDialog;
    var _permissionList = [];
    var _allUsersList = [];
    var self = this;
    self.showSettings;
    self.usersList = [];

    /* Public methods */
    self.$onInit = onInit;
    self.showActivitySettings = showActivitySettings;
    self.deleteSurveyTemplate = deleteSurveyTemplate;
    self.onModelChange = onModelChange;
    self.querySearch = querySearch;

    function onInit() {
      self.showSettings = false;
      _dialogs();
      _getCollectionOfPermissions();
      self.permission = ActivityPermissionFactory.create(self.surveyForm);
    }

    function showActivitySettings() {
      // self.showSettings === false ? true : false;

      self.showSettings = true;
      _getAllUsers();

      _filterUsersWithPermissionExclusiveDisjunction();
      localStorage.removeItem('selectedPermission');
      localStorage.setItem('selectedPermission', JSON.stringify(self.permission));
      DashboardStateService.goToActivitySettings();
    }

    // TODO:
    function deleteSurveyTemplate() {
      $mdDialog.show(_deleteConfirmDialog).then(function () {
        var current = self.surveyTemplates.filter(function (current, index) {
          if (current.surveyTemplate.identity.acronym === self.surveyForm.surveyTemplate.identity.acronym && current.version === self.surveyForm.version) {
            return current;
          }
        });

        ProjectConfigurationService.deleteSurveyTemplate(acronym)
          .then(function () {
            self.surveyTemplates.splice(index, 1);
            $mdToast.show($mdToast.simple().textContent('Template excluído com sucesso').hideDelay(timeShowMsg));
          })
          .catch(function () {
            $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
          });
      }, function () { });
    }

    function onModelChange(user) {
      // self.permission.
      ProjectConfigurationService.setUsersExclusiveDisjunction(permission.toJSON())
        .then(function () {
          // TODO:
          $mdToast.show($mdToast.simple().textContent('Usuário(s) atualizado(s) com sucesso').hideDelay(timeShowMsg));
        })
        .catch(function () {
          $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
        });
    }

    function querySearch(criteria) {
      var list = _ignoreAlreadySelectedUsers();
      return criteria ? list.filter(_createFilterFor(criteria)) : [];
    }

    function _createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();
      return function filterFn(user) {
        return (user.email.indexOf(lowercaseQuery) !== -1);
      };
    }

    function _ignoreAlreadySelectedUsers() {
      var list = [];
      self.usersList.filter(function (alreadyRegistered) {
        _allUsersList.filter(function (user) {
          if (user.email !== alreadyRegistered.email) {
            list.push(user);
          }
        });
      });
      return list;
    }

    // TODO: Problema na exibição
    function _filterUsersWithPermissionExclusiveDisjunction() {
      _permissionList.forEach(function (permission) {
        if (permission.acronym === self.permission.acronym && permission.version == self.permission.version) {
          self.permission.exclusiveDisjunction = permission.exclusiveDisjunction;
        }
      });
    }

    function _getCollectionOfPermissions() {
      ProjectConfigurationService.getCollectionOfPermissions()
        .then(function (data) {
          _permissionList = data;
        }).catch(function () {
          $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
        });
    }

    function _getAllUsers() {
      _userManager = UserManagerFactory.create(ProjectConfigurationService.getUserResource());
      _userManager.list().then(function (response) {
        if ('data' in response) {
          _allUsersList = response.data;
        } else {
          $mdToast.show($mdToast.simple().textContent('Ocorreu algum problema, tente novamente mais tarde').hideDelay(timeShowMsg));
        }
      });
    }

    function _dialogs() {
      _deleteConfirmDialog = $mdDialog.confirm()
        .title('Exclusão de Formulário')
        .textContent('Você tem certeza que deseja excluir esse Formulário?')
        .ariaLabel('exclusão de formulário')
        .ok('Sim')
        .cancel('Não');
    }


  }
}());