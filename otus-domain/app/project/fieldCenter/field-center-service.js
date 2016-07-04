(function() {
    'use strict';

    angular
        .module('otusDomain.project.fieldCenter')
        .service('ProjectFieldCenterService', ProjectFieldCenterService);

    ProjectFieldCenterService.$inject = ['OtusRestResourceService', 'ProjectFieldCenterContext', '$q'];

    function ProjectFieldCenterService(OtusRestResourceService, ProjectFieldCenterContext, $q) {
        var self = this;
        self.loadCenters = loadCenters;
        self.getCenters = getCenters;
        self.create = create;
        self.update = update;

        function getCenters() {
            return ProjectFieldCenterContext.fieldCenters;
        }

        function loadCenters() {
            var otusFieldCenter = OtusRestResourceService.getOtusFieldCenterResource();
            otusFieldCenter.getAll(function(response) {
                ProjectFieldCenterContext.setFieldCenters(response.data);
            });
        }

        function create(fieldCenter, callback) {
            var otusFieldCenter = OtusRestResourceService.getOtusFieldCenterResource();
            otusFieldCenter.create(fieldCenter, function(response) {
                loadCenters();
                callback(response);
            });
        }

        function update(fieldCenter, callback){
            delete fieldCenter.editMode;

            var otusFieldCenter = OtusRestResourceService.getOtusFieldCenterResource();
            otusFieldCenter.update(fieldCenter, function(response) {
                loadCenters();
                callback(response);
            });
        }

    }

}());
