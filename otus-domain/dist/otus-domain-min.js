!function(){angular.module("otusDomain",["dependencies","otusDomain.dashboard","otusDomain.authenticator","otusDomain.installer","otusDomain.repository","otusDomain.project","otusDomain.project.fieldCenter","otusDomain.project.configuration","otus.domain.client","otus.client","otusDomain.user","utils"])}(),function(){"use strict";angular.module("otusDomain.authenticator",[])}(),function(){angular.module("dependencies",["ngMaterial","ngMessages","ngAnimate","ui.mask","ui.router"])}(),function(e){e.__env=e.__env||{},e.__env.apiUrl="http://api-domain.localhost:8080"}(this),function(){function e(e,t,o){var n=t.__env;e.setUrl(n.apiUrl),o.reloadLoggedUser()}angular.module("otusDomain").run(["RestResourceService","$window","UserService",e])}(),function(){function e(e){e.formatDate=function(e){return moment(e).format("DD/MM/YYYY")},e.parseDate=function(e){var t=moment(e,"DD/MM/YYYY",!0);return t.isValid()?t.toDate():new Date(NaN)}}angular.module("otusDomain").config(["$mdDateLocaleProvider",e])}(),function(){function e(e){e.errorOnUnhandledRejections(!1)}angular.module("otusDomain").config(e),e.$inject=["$qProvider"]}(),function(){"use strict";function e(e,t,o,n,r,i,a){function c(){var e=o.defer();return a.isLogged()?e.resolve():e.reject({redirectTo:i.LOGIN}),e.promise}function s(){var e=o.defer();return a.isLogged()?e.reject({redirectTo:i.HOME}):e.resolve(),e.promise}function u(){var e=o.defer();return n.hasProject()?e.resolve():e.reject({redirectTo:i.HOME}),e.promise}function l(){var e=o.defer();return a.getInstallerResource().ready(function(t){t.data?e.resolve():e.reject({redirectTo:i.INSTALLER})}),e.promise}function f(){var e=o.defer();return a.getInstallerResource().ready(function(t){t.data?e.reject({redirectTo:i.LOGIN}):e.resolve()}),e.promise}var d=this;d.loggedUser=c,d.alreadyLogged=s,d.selectedProject=u,d.initialConfiguration=l,d.onlyOneConfiguration=f,t.$on("$stateChangeError",function(t,o,n,r,i,a){t.preventDefault(),a.redirectTo?e.go(a.redirectTo):e.go("error",{status:a.status})})}angular.module("otusDomain").service("RouteRulesResolver",e),e.$inject=["$state","$rootScope","$q","ProjectContext","DashboardStateService","APP_STATE","RestResourceService"]}(),function(){function e(e,t){var o="app/dashboard/menu/dashboard-menu.html",n="app/dashboard/template/main-dashboard-template.html";e.state("installer",{url:"/installer",resolve:{onlyOneConfiguration:function(e){return e.onlyOneConfiguration()}},views:{"system-wrap":{templateUrl:"app/installer/initial/initial-config.html",controller:"InitialConfigController as initialConfigController"},"repository-config@installer":{templateUrl:"app/survey-repository/repository.html",controller:"InitialConfigController as initialConfigController"}}}).state("login",{url:"/login",resolve:{loggedUser:function(e){return e.alreadyLogged()},initialConfiguration:function(e){return e.initialConfiguration()}},views:{"system-wrap":{templateUrl:"app/authenticator/login/login.html",controller:"LoginController",controllerAs:"loginController"}}}).state("user-register",{url:"/user/register",resolve:{initialConfiguration:function(e){return e.initialConfiguration()}},views:{"system-wrap":{templateUrl:"app/user/management/registry/user-register.html",controller:"UserRegisterController",controllerAs:"userRegisterController"}}}).state("user-activation",{url:"/user/activation",resolve:{loggedUser:function(e){return e.loggedUser()}},views:{"system-wrap":{templateUrl:n,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@user-activation":{templateUrl:o},"system-content@user-activation":{templateUrl:"app/user/management/activation/user-activation.html",controller:"UserActivationController",controllerAs:"$ctrl"}}}).state("user-otus-management",{url:"/project/user",resolve:{loggedUser:function(e){return e.loggedUser()},selectedProject:function(e){return e.selectedProject()}},views:{"system-wrap":{templateUrl:n,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@user-otus-management":{templateUrl:o},"system-content@user-otus-management":{template:'<otus-user flex="80"></otus-user>'}}}).state("field-center",{url:"/project/centers",resolve:{loggedUser:function(e){return e.loggedUser()},selectedProject:function(e){return e.selectedProject()},loadCenters:function(e){e.loadCenters()}},views:{"system-wrap":{templateUrl:n,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@field-center":{templateUrl:o},"system-content@field-center":{templateUrl:"app/project/fieldCenter/field-center-template.html",controller:"FieldCenterController",controllerAs:"fieldCenterController"}}}).state({name:"activity_configuration",url:"/project/activity_configuration",resolve:{loggedUser:function(e){return e.loggedUser()},selectedProject:function(e){return e.selectedProject()},initialize:function(e){e.initialize()}},views:{"system-wrap":{templateUrl:n,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@activity_configuration":{templateUrl:o},"system-content@activity_configuration":{template:'<activity-configuration flex="80"></activity-configuration>'}}}).state("home",{url:"/home",resolve:{loggedUser:function(e){return e.loggedUser()}},views:{"system-wrap":{templateUrl:n,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@home":{templateUrl:o},"system-content@home":{templateUrl:"app/dashboard/template/dashboard-content-template.html"},"section-info@home":{templateUrl:"app/dashboard/home/home-info-section.html"},"section-view@home":{templateUrl:"app/dashboard/home/home-view-section.html"},"section-commands@home":{templateUrl:"app/dashboard/home/home-commands-section.html"}}}).state("configuration-center",{url:"/project/configuration",resolve:{loggedUser:function(e){return e.loggedUser()},selectedProject:function(e){return e.selectedProject()}},views:{"system-wrap":{templateUrl:n,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@configuration-center":{templateUrl:o},"system-content@configuration-center":{templateUrl:"app/project/configuration/configuration-template.html",controller:"otusjs.otus-domain.project.configuration.ProjectConfigurationController",controllerAs:"configController"}}}).state("offline",{url:"/offline",views:{"system-wrap":{templateUrl:"app/response-error/offline/offline.html",controller:"ResponseErrorOfflineController as controller"}}}),t.otherwise("/login")}angular.module("otusDomain").config(["$stateProvider","$urlRouterProvider",e]).constant("APP_STATE",{LOGIN:"login",USER_REGISTER:"user-register",INSTALLER:"installer",HOME:"home",USER_ACTIVATION:"user-activation",USER_ACTIVATION_IN_PROJECT:"user-otus-management",PROJECT_CENTER:"field-center",PROJECT_ACTIVITY_CONFIGURATION:"activity_configuration",ERROR_OFFLINE:"offline",PROJECT_CONFIGURATION:"configuration-center"}),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){function e(e,t){e.theme("layoutTheme").primaryPalette("blue",{default:"A200","hue-1":"200"}).accentPalette("blue-grey",{default:"900","hue-1":"50"}).warnPalette("red"),t.defaultIconSet("app/assets/img/icons/mdi.svg",24)}angular.module("otusDomain").config(["$mdThemingProvider","$mdIconProvider",e])}(),function(){"use strict";angular.module("otusDomain.dashboard",[])}(),function(){"use strict";angular.module("otusDomain.installer",["passwordControl"])}(),function(){"use strict";angular.module("otusDomain.project",["ngMaterial"])}(),function(){"use strict";angular.module("otusDomain.repository",[])}(),function(){"use strict";angular.module("otusDomain.user",["otusDomain.user.management"])}(),angular.module("passwordControl",[]).directive("stPassword",function(){return{require:"ngModel",restrict:"A",link:function(e,t,o,n){var r=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;e.$watch(function(){return n.$modelValue},function(e){r.test(e)&&e.length>=6&&e.length<=32?n.$setValidity("passwordPattern",!0):n.$setValidity("passwordPattern",!1)})}}}).directive("stPasswordMatch",function(){return{require:"ngModel",restrict:"A",scope:{stPasswordMatch:"="},link:function(e,t,o,n){function r(e,t){e!==t?n.$setValidity("passwordMatch",!1):n.$setValidity("passwordMatch",!0)}e.$watch(function(){return e.stPasswordMatch},function(e){r(e,n.$modelValue)}),e.$watch(function(){return n.$modelValue},function(t){r(e.stPasswordMatch,t)})}}}),function(){angular.module("utils",[]).service("StringNormalizer",[function(){function e(e){for(var t=-1!==e.indexOf("-")?"-":".",o=e.split(t),n=o.length,r=o[0].toLowerCase(),i=1;i<n;i++){var a=o[i].slice(0,1),c=o[i].slice(1);r=r.concat(a.toUpperCase().concat(c.toLowerCase()))}return r}this.normalizeString=e}])}(),function(){"use strict";function e(e,t,o,n,r){e.authenticate=function(e){r.authenticate(e).then(function(){t.goToHome()},function(){n.show(n.simple().textContent("Login Inválido! Verifique os dados informados."))})},e.register=function(){t.goToUserRegister()}}angular.module("otusDomain.authenticator").controller("LoginController",e),e.$inject=["$scope","DashboardStateService","RestResourceService","$mdToast","UserService"]}(),function(){"use strict";function e(e,t,o,n,r){function i(){v.currentState="Login",e.go(o.LOGIN)}function a(){v.currentState="Instalador do Sistema",e.go(o.INSTALLER)}function c(){v.currentState="Cadastro de Usuário",e.go(o.USER_REGISTER)}function s(){v.currentState="Home",e.go(o.HOME)}function u(){v.currentState="Liberação de Usuários",e.go(o.USER_ACTIVATION)}function l(){v.currentState="Liberação de usuários no projeto selecionado",e.go(o.USER_ACTIVATION_IN_PROJECT)}function f(){v.currentState="Centros",e.go(o.PROJECT_CENTER)}function d(){v.currentState="Configuração de atividade",e.go(o.PROJECT_ACTIVITY_CONFIGURATION)}function m(){v.currentState="Configurações de Projeto",e.go(o.PROJECT_CONFIGURATION)}function g(){v.currentState="Offline",e.go(o.ERROR_OFFLINE)}function p(){n.getAuthenticatorResource().invalidate(function(){n.removeSecurityToken(),r.removeSecurityToken(),i()})}var v=this;v.goToLogin=i,v.goToHome=s,v.goToInstaller=a,v.goToUserRegister=c,v.goToUserActivation=u,v.goToUserActivationInProject=l,v.goToProjectCenters=f,v.goToProjectConfiguration=m,v.goToErrorOffline=g,v.goToProjectActivityConfiguration=d,v.logout=p,function(){v.currentState="Login"}()}angular.module("otusDomain.dashboard").service("DashboardStateService",e),e.$inject=["$state","$http","APP_STATE","RestResourceService","OtusRestResourceService"]}(),function(){"use strict";function e(){}angular.module("otusDomain.dashboard").controller("HomeController",e),e.$inject=[]}(),function(){"use strict";function e(e,t,o,n,r){function i(){return t.currentState}function a(){o("left").toggle()}function c(){o("left").close()}function s(){t.goToHome(),c()}function u(){t.goToSurveyForms(),c()}function l(){t.goToUserActivation(),c()}function f(){t.goToUserActivationInProject(),c()}function d(){t.goToProjectActivityConfiguration(),c()}function m(){t.goToProjectCenters(),c()}function g(){t.goToProjectConfiguration(),c()}function p(){e.showDialog().onConfirm(t.logout)}var v=this;v.getSelectedSystemArea=i,v.open=a,v.close=c,v.openHome=s,v.openSurveyForms=u,v.openUserActivation=l,v.logout=p,v.openProjectCenters=m,v.openUserActivationInProject=f,v.openProjectConfiguration=g,v.openProjectActivityConfiguration=d}angular.module("otusDomain.dashboard").controller("DashboardMenuController",e),e.$inject=["LogoutDialogService","DashboardStateService","$mdSidenav","ProjectSelectionService","ProjectContext"]}(),function(){"use strict";function e(e,t,o,n,r,i){function a(e){o.isLoading=!0,v.config(e,function(e){e.data?s():c(e.MESSAGE),o.isLoading=!1})}function c(e){t.show(t.simple().textContent(C))}function s(){var e=n.alert().title("Informação").content(h).ok("ok");n.show(e).finally(function(){r.goToLogin()})}function u(e){v.validationEmail(e,function(e){d(e.data)})}function l(e){p.validateCredentials(e,function(e){m(e.data)})}function f(e){p.validateConnection(e,function(e){g(e.data)})}function d(e){o.initialConfigSystemForm.emailSenderEmail.$setValidity("emailService",e),o.initialConfigSystemForm.$setValidity("emailService",e)}function m(e){o.initialConfigSystemForm.repositoryUsername.$setValidity("credentials",e),o.initialConfigSystemForm.repositoryPassword.$setValidity("credentials",e),o.initialConfigSystemForm.$setValidity("credentials",e)}function g(e){o.initialConfigSystemForm.repositoryHost.$setValidity("connection",e),o.initialConfigSystemForm.repositoryPort.$setValidity("connection",e),o.initialConfigSystemForm.$setValidity("credentials",e)}self=this;var p,v,h="Seu cadastro foi realizado com sucesso! Você vai ser redirecionado para a tela de login.",C="Houve um erro ao instalar seu projeto. Verifique os dados informados";self.register=a,self.validateEmailService=u,self.validateCredentials=l,self.validateRepositoryConnection=f,self.validateEmailService=u,function(){p=i.getRepositoryResource(),v=i.getInstallerResource()}()}angular.module("otusDomain.installer").controller("InitialConfigController",e),e.$inject=["$q","$mdToast","$scope","$mdDialog","DashboardStateService","RestResourceService"]}(),function(){"use strict";function e(){}angular.module("otusDomain.dashboard").component("activityConfiguration",{controller:e,templateUrl:"app/project/activity/activity-configuration-template.html"})}(),function(){"use strict";angular.module("otusDomain.project.configuration",["ngMaterial"])}(),function(){"use strict";function e(e){}angular.module("otusDomain.project.configuration").controller("otusjs.otus-domain.project.configuration.ProjectConfigurationController",e),e.$inject=["otusjs.otus-domain.project.configuration.ProjectConfigurationService"]}(),function(){"use strict";function e(e,t){function o(){var e=t.defer();return s.getSurveys(function(t){"data"in t?e.resolve(t.data):e.reject(!0)}),e.promise}function n(e){var o=t.defer();return s.updateSurveyTemplateType({acronym:e.acronym,newSurveyFormType:e.type},function(e){e.data?o.resolve(!0):o.reject(!0)}),o.promise}function r(e){var o=t.defer();return s.deleteSurveyTemplate({acronym:e},function(e){e.data?o.resolve(!0):o.reject(!0)}),o.promise}function i(e){var o=t.defer();return s.publishTemplate(e,function(e){"data"in e?o.resolve(e.data):o.reject(e.MESSAGE)}),o.promise}function a(){var e=t.defer();return s.getVisualIdentity(function(t){e.resolve()}),e.promise}function c(e){var o=t.defer();return s.updateVisualIdentity(e,function(){o.resolve()}),o.promise}var s,u=this;(function(){s=e.getProjectConfigurationResource()})(),u.fetchSurveysManagerConfiguration=o,u.publishTemplate=i,u.updateSurveyTemplateType=n,u.deleteSurveyTemplate=r,u.fetchProjectsVisualIdentity=a,u.updateVisualIdentityConfiguration=c}angular.module("otusDomain.project.configuration").service("otusjs.otus-domain.project.configuration.ProjectConfigurationService",e),e.$inject=["OtusRestResourceService","$q"]}(),function(){"use strict";function e(e){function t(e){return i.enableExtraction(e).$promise}function o(e){return i.disableExtraction(e).$promise}function n(e){return i.updateExtractionIps(e).$promise}var r=this,i=e.getExtractionResource();r.enableExtraction=t,r.disableExtraction=o,r.updateExtractionIps=n}angular.module("otusDomain.project").service("ExtractionRestService",e),e.$inject=["OtusRestResourceService"]}(),function(){"use strict";function e(){function e(e){t.fieldCenters=e}var t=this;t.fieldCenters=[],t.setFieldCenters=e}angular.module("otusDomain.project.fieldCenter").service("ProjectFieldCenterContext",e)}(),function(){"use strict";function e(e,t,o){function n(){return e.getCenters()}function r(e){e.editMode=!e.editMode}function i(t){e.update(t,function(e){e.hasErrors||o.show(o.simple().textContent(c))})}function a(){t.show({templateUrl:"app/project/fieldCenter/dialog/create-field-center-template.html",clickOutsideToClose:!0,controller:"CreateFieldCenterController",controllerAs:"createFieldCenter"})}var c="Centro atualizado",s=this;s.getAllCenters=n,s.edit=r,s.create=a,s.update=i}angular.module("otusDomain.project.fieldCenter").controller("FieldCenterController",e),e.$inject=["ProjectFieldCenterService","$mdDialog","$mdToast"]}(),function(){"use strict";angular.module("otusDomain.project.fieldCenter",[])}(),function(){"use strict";function e(e,t){function o(){return t.fieldCenters}function n(){e.getOtusFieldCenterResource().getAll(function(e){t.setFieldCenters(e.data)},function(){t.setFieldCenters([])})}function r(t,o){e.getOtusFieldCenterResource().create(t,function(e){n(),o(e)})}function i(t,o){delete t.editMode,e.getOtusFieldCenterResource().update(t,function(e){n(),o(e)})}var a=this;a.loadCenters=n,a.getCenters=o,a.create=r,a.update=i}angular.module("otusDomain.project.fieldCenter").service("ProjectFieldCenterService",e),e.$inject=["OtusRestResourceService","ProjectFieldCenterContext"]}(),function(){"use strict";function e(e,t,o,n,r){function i(){h=e.getUserResource(),C=e.getOtusFieldCenterResource(),S=o.create(h),p(),f(),g()}function a(e){n.show(y).then(function(){e.enable?u(e):l(e)},function(){e.enable=!e.enable})}function c(e){n.show(j).then(function(){e.extraction?d(e):m(e)},function(){e.extraction=!e.extraction})}function s(e){S.updateFieldCenter(angular.toJson(e)).then(function(e){v("Centro atualizado.")})}function u(e){S.enable(e).then(function(e){v("Usuário habilitado.")})}function l(e){S.disable(e).then(function(t){e.extraction&&(e.extraction=!1,m(e)),v("Usuário desabilitado.")})}function f(){S.list().then(function(e){R.users=e.data})}function d(e){t.enableExtraction(e).then(function(e){v("Extração habilitada.")})}function m(e){t.disableExtraction(e).then(function(e){v("Extração desabilitada.")})}function g(){C.getAll(function(e){R.fieldCenters=e.data})}function p(){y=n.confirm().title(T).textContent(D).ok("Sim").cancel("Cancelar"),j=n.confirm().title(U).textContent($).ok("Sim").cancel("Cancelar")}function v(e){r.show(r.simple().textContent(e))}var h,C,y,j,S,R=this,D="Você tem certeza que deseja alterar o status do usuário?",T="Mudança de Status",$="Você tem certeza que deseja alterar o status de Extração do usuário?",U="Mudança de Status para Extração de Dados";R.users=[],R.fieldCenters=[],R.$onInit=i,R.enableDisable=a,R.updateFieldCenter=s,R.enableDisableExtraction=c}angular.module("otusDomain.project").component("otusUser",{templateUrl:"app/project/otus-user/otus-user-template.html",controller:e}),e.$inject=["OtusRestResourceService","ExtractionRestService","UserManagerFactory","$mdDialog","$mdToast"]}(),function(){"use strict";function e(){function e(e){return new t(e)}var o=this;return o.create=e,o}function t(e){function t(t){return e.enable(t).$promise}function o(t){return e.disable(t).$promise}function n(){return e.list().$promise}function r(t){return e.updateFieldCenter(t).$promise}var i=this;i.enable=t,i.disable=o,i.list=n,i.updateFieldCenter=r}angular.module("otusDomain.project").factory("UserManagerFactory",e)}(),function(){"use strict";function e(e,t){function o(){f=[]}function n(e){l=e,s()}function r(){return l}function i(){return null!==l}function a(n){o(),e.getOtusProjectResource().list(function(e){e.data.forEach(function(e,o,n){var r=e.projectName,i=e.projectRestUrl,a=e.projectToken,c=t.create(r,i,a);f.push(c)}),n(f)})}function c(e){d.push(e)}function s(){d.forEach(function(e){e(l)})}var u=this,l=null,f=[],d=[];u.setProject=n,u.hasProject=i,u.getCurrentProject=r,u.loadProjects=a,u.registerObserver=c}angular.module("otusDomain.project").service("ProjectContext",e),e.$inject=["RestResourceService","ProjectFactory"]}(),function(){"use strict";function e(e,t,o){function n(t){e.setUrl(t.url),e.getOtusInstallerResource().ready(function(e){e.data?t.online():t.offline()},function(){t.offline()})}function r(o){var n=t.defer();e.setUrl(o.url);var r=o.getAuthentication();return e.getOtusAuthenticatorResource().authenticateProject(r,function(e){e.data?n.resolve(e):n.reject(e)}),n.promise}var i=this;i.isOnline=n,i.authenticate=r}angular.module("otusDomain.project").service("ProjectSecurityService",e),e.$inject=["OtusRestResourceService","$q","ProjectContext"]}(),function(){"use strict";function e(e,t){function o(){e.hasProject()||n()}function n(){e.loadProjects(function(e){r(e)})}function r(e){t.show({controller:"ProjectChooseController as projectChoose",templateUrl:"app/project/selection/ui/dialog/project-choose-template.html",parent:angular.element(document.body),clickOutsideToClose:!0,fullscreen:!0,locals:{projects:e}})}var i=this;i.choose=n,i.initialChoose=o}angular.module("otusDomain.project").service("ProjectSelectionService",e),e.$inject=["ProjectContext","$mdDialog"]}(),function(){function e(e){e.interceptors.push("otusDomain.ResponseInterceptor")}angular.module("otusDomain").config(["$httpProvider",e])}(),function(){"use strict";function e(e){function t(t){return e.get("DashboardStateService"),t}var o=this;return o.responseError=t,o}angular.module("otusDomain").factory("otusDomain.ResponseInterceptor",e),e.$inject=["$injector"]}(),function(){"use strict";function e(e){function t(){e.goToLogin()}this.tryAgain=t}angular.module("otusDomain").controller("ResponseErrorOfflineController",e),e.$inject=["DashboardStateService"]}(),function(){"use strict";function e(e){function t(e){i.create(e,function(e){return!e.data.hasError})}function o(e){i.validateConnection(e,function(e){return e.data})}function n(e){i.getByRepositoryName({repositoryName:e.name},function(e){return e.data})}function r(e){i.validateCredentials(e,function(e){return e.data})}var i,a=this;a.createRepository=t,a.validateRepositoryConnection=o,a.validateIfRepositoryAlreadyExists=n,a.validateRepositoryCredentials=r,function(){i=e.getRepositoryResource()}()}angular.module("otusDomain.repository").service("RepositoryService",e),e.$inject=["RestResourceService"]}(),function(){"use strict";function e(e,t,o,n){function r(t){var n=o.defer();return e.getAuthenticatorResource().authenticate(t,function(e){e.data?(c(e.data),n.resolve()):n.reject()}),n.promise}function i(){var t=o.defer();return e.getAuthenticatorResource().invalidate(function(){s(),t.resolve()},function(){t.reject()}),t.promise}function a(){n.reloadCurrentUser()}function c(t){e.setSecurityToken(t.token),n.setCurrentUser(t)}function s(){n.removeCurrentUser(),e.removeSecurityToken(),t.removeSecurityToken()}function u(){return n.getCurrentUser()}var l=this;l.getLoggedUser=u,l.authenticate=r,l.logout=i,l.reloadLoggedUser=a}angular.module("otusDomain.user").service("UserService",e),e.$inject=["RestResourceService","OtusRestResourceService","$q","UserContext"]}(),function(){"use strict";function e(e){function t(){i.currentUser=null}function o(e){i.currentUser=e}function n(){return i.currentUser}function r(){if(e.isLogged()){e.getUserResource().current(function(e){o(e.data)})}}var i=this;i.currentUser=null,i.setCurrentUser=o,i.getCurrentUser=n,i.reloadCurrentUser=r,i.removeCurrentUser=t}angular.module("otusDomain.user").service("UserContext",e),e.$inject=["RestResourceService"]}(),function(){"use strict";angular.module("otusDomain.user.management",["passwordControl"])}(),function(){"use strict";function e(e){function o(){return e.show(i.dialogSettings).then(n,r),{onConfirm:function(e){i.callback=e}}}function n(e){"confirm"===e.action&&i.callback&&i.callback(e.data)}function r(e){}var i=this;i.showDialog=o,function(){i.dialogSettings={parent:angular.element(document.body),templateUrl:"app/dashboard/dialog/logout/logout-dialog.html",controller:t,controllerAs:"controller",openFrom:"#system-toolbar",closeTo:{bottom:0}}}()}function t(e){function t(t){e.hide(t)}function o(t){e.hide(t)}var n=this;n.cancel=t,n.confirm=o}angular.module("otusDomain.dashboard").service("LogoutDialogService",e),e.$inject=["$mdDialog"]}(),function(){"use strict";function e(e,t){function o(){r()}function n(){a.newCategoryLabel?t.save(a.newCategoryLabel).then(function(e){a.newCategoryLabel="",a.categories.push(e.data)}):i()}function r(){t.list().then(function(e){a.categories=e})}function i(){e.show(e.simple().textContent("A label não pode ser vazia").hideDelay(2e3))}var a=this;a.newCategoryLabel="",a.$onInit=o,a.newCategory=n,a.listCategories=r}angular.module("otusDomain.dashboard").component("activityCategoryConfiguration",{controller:e,templateUrl:"app/project/activity/category/category-configuration-template.html"}),e.$inject=["$mdToast","ActivityRestService"]}(),function(){"use strict";function e(e){function t(t,o,n){function r(t){var o=e.uploadTypeResolver(t);return""!==o?(i=document.createElement("input"),i.setAttribute("type","file"),i.setAttribute("accept",o)):i=document.createElement("button"),i}var i,a=t.uploadTool,c=a.callback||{},s=a.type||"any";o.on("click",function(e){i=r(s),i.click(),i.addEventListener("change",function(){for(var e=[],t=0;t<this.files.length;t++)e.push(this.files[t]);0!==e.length&&c(e)})})}return{restrict:"A",link:t,scope:{uploadTool:"="}}}angular.module("otusDomain.project.configuration").directive("uploadTool",e),e.$inject=["otusjs.otus-domain.project.configuration.UploadToolService"]}(),function(){"use strict";function e(){function e(e){var o="";if(e){e=e.replace(/\s/g,"").split(",");for(var n=0;n<e.length;n++){var r=t(e[n]);r&&(o+=r+", ")}}return o||"any"}function t(e){return{image:"image/*",jpg:".jpg",png:".png",json:".json"}[e]}this.uploadTypeResolver=e}angular.module("otusDomain.project.configuration").service("otusjs.otus-domain.project.configuration.UploadToolService",e),e.$inject=[]}(),function(){"use strict";function e(e,t,o,n){function r(){t.cancel()}function i(e){o.create(e,function(t){t.hasErrors?a(e,t):(s(),r())})}function a(t,o){e.createForm.acronym.$setValidity(o.data.errorType,!1)}function c(){e.createForm.acronym.$setValidity("ALREADY_EXIST",!0)}function s(){n.show(n.simple().textContent(u))}var u="Centro Adicionado com Sucesso",l=this;l.close=r,l.create=i,l.resetValidation=c}angular.module("otusDomain.project.fieldCenter").controller("CreateFieldCenterController",e),e.$inject=["$scope","$mdDialog","ProjectFieldCenterService","$mdToast"]}(),function(){"use strict";function e(e,t,o,n){function r(){l.cloneExtractionIps=angular.copy(l.user.extractionIps),c()}function i(){t.show(u).then(function(){l.cloneExtractionIps=angular.copy(l.user.extractionIps),a(),n.find("#userIp"+l.userIndex).focus()},function(){l.user.extractionIps=angular.copy(l.cloneExtractionIps),n.find("#userIp"+l.userIndex).focus()})}function a(){e.updateExtractionIps(l.user).then(function(e){s("Ip(s) atualizado(s).")})}function c(){u=t.confirm().title(f).textContent(d).ok("Sim").cancel("Cancelar")}function s(e){o.show(o.simple().textContent(e))}var u,l=this,f="Alteração nos IPs de extração",d="Você tem certeza que deseja alterar os IPs de Extração do usuário?";l.$onInit=r,l.onIpChange=i}angular.module("otusDomain.project").component("extractiosIpsField",{templateUrl:"app/project/otus-user/extraction-ips-field/extraction-ips-field-teamplate.html",controller:e,bindings:{user:"=",userIndex:"<"}}),e.$inject=["ExtractionRestService","$mdDialog","$mdToast","$element"]}(),function(){"use strict";function e(e){function o(o,n,r){return new t(o,n,e.getLoggedUser().email,r)}var n=this;return n.create=o,n}function t(e,t,n,r){function i(){return l}function a(){u.status=!0}function c(){u.status=!1}function s(e){u.status=e}var u=this,l=new o(n,r);u.name=e,u.url=t,u.status=!1,u.getAuthentication=i,u.online=a,u.offline=c,u.changeStatus=s}function o(e,t){var o=this;o.user=e,o.accessToken=t}angular.module("otusDomain.project").factory("ProjectFactory",e),e.$inject=["UserService"]}(),function(){"use strict";function e(e){function t(t){e.registerObserver(function(e){e?t.show():t.hide()})}return{retrict:"A",controller:function(e,o,n){e.hasProject()?n.show():n.hide(),t(n)}}}angular.module("otusDomain.project").directive("otusWaitingProject",e),e.$inject=["ProjectContext"]}(),function(){"use strict";function e(e,t){function o(){u=t.getActivityConfigurationResource()}function n(e){if(!u)throw new Error("REST resource is not initialized.");return u.update(e).$promise}function r(e){if(!u)throw new Error("REST resource is not initialized.");return u.create({label:e}).$promise}function i(e){if(!u)throw new Error("REST resource is not initialized.");return u.setDefault({id:e.name}).$promise}function a(){if(!u)throw new Error("REST resource is not initialized.");var t=e.defer();return u.listAll().$promise.then(function(e){e.data&&e.data.length?t.resolve(e.data):t.resolve([])}),t.promise}function c(e){if(!u)throw new Error("REST resource is not initialized.");return u.delete({id:e.name}).$promise}var s=this,u=null;s.initialize=o,s.update=n,s.setDefault=i,s.list=a,s.save=r,s.remove=c}angular.module("otusDomain").service("ActivityRestService",e),e.$inject=["$q","OtusRestResourceService"]}(),function(){"use strict";function e(e,t,o){function n(e){e.enable?i(e):a(e)}function r(e){var o=t.confirm().title(f).textContent(l).ok("Sim").cancel("Cancelar");t.show(o).then(function(){n(e)},function(){e.enable=!e.enable})}function i(e){s.enable(e,function(){o.show(o.simple().textContent("Usuário habilitado."))})}function a(e){s.disable(e,function(){o.show(o.simple().textContent("Usuário desabilitado."))})}function c(){s.list(function(e){u.users=e.data})}var s,u=this,l="Você tem certeza que deseja alterar o status do usuário ?",f="Mudança de Status";u.users=[],u.confirmDialog=r,function(){s=e.getUserResource(),c()}()}angular.module("otusDomain.user.management").controller("UserActivationController",e),e.$inject=["RestResourceService","$mdDialog","$mdToast"]}(),function(){function e(e,t,o,n){function r(e){n.getUserResource().create(e,function(e){e.data&&a()})}function i(){o.goToLogin()}function a(){var e=t.alert().title("Informação").content(c).ok("ok");t.show(e).finally(function(){o.goToLogin()})}var c="Sua liberação está pendente de aprovação.",s=this;s.register=r,s.back=i}angular.module("otusDomain.user.management").controller("UserRegisterController",e),e.$inject=["$http","$mdDialog","DashboardStateService","RestResourceService"]}(),function(){angular.module("otusDomain.user.management").directive("unique",["$http","$q","RestResourceService",function(e,t,o){return{restrict:"A",require:"ngModel",link:function(e,n,r,i){i.$asyncValidators.emailInUse=function(e){var n=t.defer();return o.getUserResource().exist({email:e},function(e){e.data?n.reject():n.resolve()}),n.promise}}}}])}(),function(){"use strict";function e(e,t,o){function n(){u()}function r(){d.onUpdate=!0}function i(){d.categoryData.label?o.update(d.categoryData).then(function(){d.onUpdate=!1,f.textContent("A categoria "+d.categoryData.label+" sera removida")}):l()}function a(){d.categoryData.isDefault?(d.categoryData.isDefault=1,s()):o.setDefault(d.categoryData).then(function(){d.reloadCategories()})}function c(){d.categoryData.isDefault?s():t.show(f).then(function(){o.remove(d.categoryData).then(function(){d.reloadCategories()})})}function s(){e.show(e.simple().textContent("Uma nova categoria padrão deve ser definida").hideDelay(2e3))}function u(){f=t.confirm().title("Confirmar remoção:").textContent("A categoria "+d.categoryData.label+" sera removida").ariaLabel("Confirmação de remoção").ok("Ok").cancel("Voltar")}function l(){e.show(e.simple().textContent("A label não pode ser vazia").hideDelay(2e3))}var f,d=this;d.onUpdate=!1,d.$onInit=n,d.categoryUpdate=r,d.saveCategory=i,d.removeCategory=c,d.saveDefault=a}angular.module("otusDomain.dashboard").component("categoryEdit",{controller:e,templateUrl:"app/project/activity/category/category-edit/category-edit-template.html",bindings:{categoryData:"<",reloadCategories:"&"}}),e.$inject=["$mdToast","$mdDialog","ActivityRestService"]}(),function(){"use strict";function e(e,t,o){function n(){var t=e.defer();return t.resolve(!0),t.promise}function r(){n().then(function(e){e.files?d.data=e:d.data={files:{logoURL:m,bannerURL:m},date:""}}).finally(function(){d.changed=!1})}function i(e){d.progressBanner=!0,c(e).then(function(e){d.data.files.bannerURL=e,d.changed=!0,d.progressBanner=!1})}function a(e){d.progressLogo=!0,c(e).then(function(e){d.data.files.logoURL=e,
d.changed=!0,d.progressLogo=!1})}function c(t){var o=e.defer(),n=new FileReader;return n.onload=function(){o.resolve(n.result)},n.readAsDataURL(t[0]),o.promise}function s(){d.changed=!1;var e={files:{logo:d.data.files.logoURL,banner:d.data.files.bannerURL},sendingDate:new Date};t.updateVisualIdentityConfiguration(e,u,l)}function u(){d.data.sendingDate=f(new Date),o.show(o.simple().textContent("Salvo com sucesso"))}function l(){o.show(o.simple().textContent("Falha ao atualizar imagem")),r()}function f(e){return e.toLocaleDateString()+" - "+e.toLocaleTimeString()}var d=this;(function(){r()})(),d.progressBanner=!1,d.progressLogo=!1,d.uploadBanner={callback:i,type:"image"},d.uploadLogo={callback:a,type:"image"},d.save=s;var m="app/assets/img/image_not_found.jpg"}angular.module("otusDomain.project.configuration").component("otusVisualIdentity",{templateUrl:"app/project/configuration/config-components/project-visual-identity-component/project-visual-identity-template.html",controller:e}),e.$inject=["$q","otusjs.otus-domain.project.configuration.ProjectConfigurationService","$mdToast"]}(),function(){"use strict";function e(e,t,o,n){function r(){t.fetchSurveysManagerConfiguration().then(function(e){m.surveyTemplatesList=e,0===m.surveyTemplatesList.length?m.noListInfo="Nenhum formulário adicionado":m.noListInfo=""}).catch(function(){m.surveyTemplatesList=[],m.noListInfo="Erro de comunicação com servidor"})}function i(e){e.forEach(function(t){"json"===e[0].name.split(".")[1]&&a(t).then(function(e){m.uploadedObject=JSON.parse(e),m.uploadedFile=e,m.disableSaving=!1})})}function a(t){var o=e.defer(),n=new FileReader;return n.onload=function(){o.resolve(n.result)},n.readAsText(t),o.promise}function c(e){n.show(d).then(function(){t.deleteSurveyTemplate(m.surveyTemplatesList[e].surveyTemplate.identity.acronym).then(function(){m.surveyTemplatesList.splice(e,1),o.show(o.simple().textContent("Excluído").hideDelay(2e3))}).catch(function(){o.show(o.simple().textContent("Erro ao excluir").hideDelay(2e3))})},function(){})}function s(e){var n=m.surveyTemplatesList[e].surveyTemplate.identity.acronym,r=m.surveyTemplatesList[e].surveyFormType;t.updateSurveyTemplateType({acronym:n,type:r}).then(function(){o.show(o.simple().textContent("Alterado com sucesso").hideDelay(2e3))}).catch(function(){o.show(o.simple().textContent("Erro ao alterar.").hideDelay(2e3)),m.surveyTemplatesList[e].surveyFormType="PROFILE"===r?"FORM_INTERVIEW":"PROFILE"})}function u(){t.publishTemplate(m.uploadedFile).then(function(e){l(e)}).catch(function(e){f(e)})}function l(e){m.uploadedObject={},m.uploadedFile={},m.disableSaving=!0,m.surveyTemplatesList.push(e),o.show(o.simple().textContent("Upload realizado com sucesso"))}function f(e){var t="";switch(e){case"Acronym Already Exists":t+="Já existe um formulário com esta sigla";break;case"ID Already Exists":t+="Ids de questões conflitam com as de formulários já existentes";break;default:t+="Erro ao enviar"}o.show(o.simple().textContent(t).hideDelay(2e3))}var d,m=this;this.$onInit=function(){r(),d=n.confirm().title("Exclusão de Formulário").textContent("Você tem certeza que deseja excluir esse Formulário?").ariaLabel("exclusão de formulário").ok("Sim").cancel("Não")},m.publishTemplate=u,m.updateSurveyFormType=s,m.deleteSurveyTemplate=c,m.uploadConfig={callback:i,type:"json"},m.uploadedObject={},m.uploadedFile={},m.disableSaving=!0}angular.module("otusDomain.project.configuration").component("otusSurveysManager",{templateUrl:"app/project/configuration/config-components/surveys-manager/surveys-manager-template.html",controller:e}),e.$inject=["$q","otusjs.otus-domain.project.configuration.ProjectConfigurationService","$mdToast","$mdDialog"]}(),function(){"use strict";function e(e,t,o,n,r,i,a){function c(){t.cancel()}function s(e){e.forEach(function(e){n.isOnline(e)})}function u(e){e.status?n.authenticate(e).then(function(t){f(t.data,e),c()},function(){l(),m()}):d()}function l(){if(i.hasProject()){var e=i.getCurrentProject();a.setUrl(e.projectRestUrl),a.setSecurityToken(e.sessionToken)}}function f(e,t){t.sessionToken=e,a.setSecurityToken(t.sessionToken),i.setProject(t)}function d(){r.show(r.simple().textContent(g))}function m(){r.show(r.simple().textContent(p))}var g="Projeto Offline. Verifique o estado do projeto.",p="Erro ao realizar autenticação no projeto",v=this;v.projects=o,v.close=c,v.select=u,function(){s(v.projects),l()}()}angular.module("otusDomain.project").controller("ProjectChooseController",e),e.$inject=["$scope","$mdDialog","projects","ProjectSecurityService","$mdToast","ProjectContext","OtusRestResourceService"]}(),function(){"use strict";function e(e,t){function o(o,n,r){o.project=t.getCurrentProject(),o.chooseProject=function(){e.choose()},o.hasProject=function(){return t.hasProject()},t.registerObserver(function(e){o.project=e})}return{templateUrl:"app/project/selection/ui/toolbar/otus-project-selection-toolbar.html",restrict:"E",link:o}}angular.module("otusDomain.project").directive("otusProjectSelection",e),e.$inject=["ProjectSelectionService","ProjectContext"]}();