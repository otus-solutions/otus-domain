(function () {
    'use strict';

    angular
        .module('otusDomain.project.configuration')
        .service('otusjs.otus-domain.project.configuration.ProjectConfigurationService', ProjectConfigurationService);

    ProjectConfigurationService.$inject = [
        'OtusRestResourceService',
        'UserManagerFactory',
        '$q'
    ];

    function ProjectConfigurationService(OtusRestResourceService, UserManagerFactory, $q) {
        var _configurationResource;
        var _projectConfigurationResource;
        var _permissionConfiguration;
        var _userResource;
        var _userManager;
        var self = this;

        /* Public methods */
        self.$onInit = onInit;
        self.fetchSurveysManagerConfiguration = fetchSurveysManagerConfiguration;
        self.publishTemplate = publishTemplate;
        self.updateSurveyTemplateType = updateSurveyTemplateType;
        self.deleteSurveyTemplate = deleteSurveyTemplate;
        self.fetchProjectsVisualIdentity = fetchProjectsVisualIdentity;
        self.updateVisualIdentityConfiguration = updateVisualIdentityConfiguration;
        self.getProjectConfiguration = getProjectConfiguration;
        self.allowNewParticipants = allowNewParticipants;
        self.getUsersList = getUsersList;
        self.setUsersExclusiveDisjunction = setUsersExclusiveDisjunction;
        self.updateUsersExclusiveDisjunction = updateUsersExclusiveDisjunction;
        self.getCollectionOfPermissions = getCollectionOfPermissions;

        onInit();

        function onInit() {
            _configurationResource = OtusRestResourceService.getConfigurationResource();
            _projectConfigurationResource = OtusRestResourceService.getProjectConfigurationResource();
            _permissionConfiguration = OtusRestResourceService.getPermissionConfigurationResource();
            _userResource = OtusRestResourceService.getUserResource();
            _userManager = UserManagerFactory.create(_userResource);
        }

        /* Surveys Manager Section */
        function fetchSurveysManagerConfiguration() {
            var defer = $q.defer();
            _configurationResource.getSurveys(function (response) {
                if ('data' in response) {
                    defer.resolve(response.data);
                } else {
                    defer.reject(true);
                }
            });
            return defer.promise;
        }

        function updateSurveyTemplateType(updateObject) {
            var defer = $q.defer();
            _configurationResource.updateSurveyTemplateType({
                'acronym': updateObject.acronym,
                'newSurveyFormType': updateObject.type
            },
                function (response) {
                    if (response.data) {
                        defer.resolve(true);
                    } else {
                        defer.reject(true);
                    }
                });
            return defer.promise;
        }

        function deleteSurveyTemplate(acronym) {
            var defer = $q.defer();
            _configurationResource.deleteSurveyTemplate({
                'acronym': acronym,
            },
                function (response) {
                    if (response.data) {
                        defer.resolve(true);
                    } else {
                        defer.reject(true);
                    }
                });

            return defer.promise;
        }

        function publishTemplate(template) {
            var defer = $q.defer();
            _configurationResource.publishTemplate(template,
                function (response) {
                    if ('data' in response) {
                        defer.resolve(response.data);
                    } else {
                        defer.reject(response.MESSAGE);
                    }
                });
            return defer.promise;
        }

        /* Visual Identity Section*/
        function fetchProjectsVisualIdentity() {
            var data = {};
            var defer = $q.defer();
            _configurationResource.getVisualIdentity(function (response) {
                defer.resolve();
            });
            return defer.promise;
        }

        function updateVisualIdentityConfiguration(files) {
            var defer = $q.defer();
            _configurationResource.updateVisualIdentity(files, function () {
                defer.resolve();
            });
            return defer.promise;
        }

        /* participant registration */
        function getProjectConfiguration() {
            var defer = $q.defer();
            if (!_projectConfigurationResource) {
                throw new Error('REST resource is not initialized.');
            }
            _projectConfigurationResource.getProjectConfiguration(function (response) {
                if ('data' in response) {
                    defer.resolve(response.data);
                } else {
                    defer.reject(true);
                }
            });
            return defer.promise;
        }

        function allowNewParticipants(permission) {
            if (!_projectConfigurationResource) {
                throw new Error('REST resource is not initialized.');
            }
            return _projectConfigurationResource.allowNewParticipants({ 'permission': permission }).$promise;
        }

        function getUsersList() {
            var defer = $q.defer();
            if (!_userManager) {
                throw new Error('REST resource is not initialized.');
            }
            _userManager.list().then(function (response) {
                if ('data' in response) {
                    defer.resolve(response.data);
                } else {
                    defer.reject(true);
                }
            });
            return defer.promise;
        }

        /* survey template settings */
        function setUsersExclusiveDisjunction() {
            var defer = $q.defer();
            if (!_permissionConfiguration) {
                throw new Error('REST resource is not initialized.');
            }
            _permissionConfiguration.create(users, function () {
                defer.resolve();
            });
            return defer.promise;
        }

        function updateUsersExclusiveDisjunction(users) {
            var defer = $q.defer();
            if (!_permissionConfiguration) {
                throw new Error('REST resource is not initialized.');
            }
            _permissionConfiguration.update(users, function () {
                defer.resolve();
            });
            return defer.promise;
        }

        function getCollectionOfPermissions() {
            var defer = $q.defer();
            if (!_permissionConfiguration) {
                throw new Error('REST resource is not initialized.');
            }
            _permissionConfiguration.getAll(function (response) {
                if ('data' in response) {
                    defer.resolve(response.data);
                } else {
                    defer.reject(true);
                }
            });
            return defer.promise;
        }
    }
}());
