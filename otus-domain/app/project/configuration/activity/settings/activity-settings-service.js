(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('activitySettingsService', Service);

  Service.$inject = [
    'ActivityReporFactory'
  ];

  function Service(ActivityReporFactory) {
    const self = this;
    let activityReports = [];

    self.getActivityReports = getActivityReports;

    function getActivityReports(jsonActivityReports){
      activityReports = [];
      if(jsonActivityReports.length){
        jsonActivityReports.forEach(report =>{
          activityReports.push(ActivityReporFactory.create(report));
        });
      }
      return activityReports;
    }
  }
})();