!function(){angular.module("otusDomain",["dependencies","otusDomain.dashboard","otusDomain.authenticator","otusDomain.installer","otusDomain.repository","otusDomain.project","otusDomain.project.fieldCenter","otus.domain.client","otus.client","user","utils"])}(),function(){"use strict";angular.module("otusDomain.authenticator",[])}(),function(){angular.module("dependencies",["ngMaterial","ngMessages","ngAnimate","ui.mask","ui.router"])}(),function(e){e.__env=e.__env||{},e.__env.apiUrl="http://api.domain.dev.ccem.ufrgs.br"}(this),function(){function e(e,t){var o=t.__env;e.setUrl(o.apiUrl)}angular.module("otusDomain").run(["RestResourceService","$window",e])}(),function(){function e(e){e.formatDate=function(e){return moment(e).format("DD/MM/YYYY")},e.parseDate=function(e){var t=moment(e,"DD/MM/YYYY",!0);return t.isValid()?t.toDate():new Date(NaN)}}angular.module("otusDomain").config(["$mdDateLocaleProvider",e])}(),function(){"use strict";function e(e,t,o,n,r,i,a){function s(){var e=o.defer();return a.isLogged()?e.resolve():e.reject({redirectTo:i.LOGIN}),e.promise}function c(){var e=o.defer();return a.isLogged()?e.reject({redirectTo:i.HOME}):e.resolve(),e.promise}function u(){var e=o.defer();return n.hasProject()?e.resolve():e.reject({redirectTo:i.HOME}),e.promise}function l(){var e=o.defer(),t=a.getInstallerResource();return t.ready(function(t){t.data?e.resolve():e.reject({redirectTo:i.INSTALLER})}),e.promise}function d(){var e=o.defer(),t=a.getInstallerResource();return t.ready(function(t){t.data?e.reject({redirectTo:i.LOGIN}):e.resolve()}),e.promise}var f=this;f.loggedUser=s,f.alreadyLogged=c,f.selectedProject=u,f.initialConfiguration=l,f.onlyOneConfiguration=d,t.$on("$stateChangeError",function(t,o,n,r,i,a){t.preventDefault(),a.redirectTo?e.go(a.redirectTo):e.go("error",{status:a.status})})}angular.module("otusDomain").service("RouteRulesResolver",e),e.$inject=["$state","$rootScope","$q","ProjectContext","DashboardStateService","APP_STATE","RestResourceService"]}(),function(){function e(e,t){var o="app/dashboard/menu/dashboard-menu.html",n="app/dashboard/template/main-dashboard-template.html";e.state("installer",{url:"/installer",resolve:{onlyOneConfiguration:function(e){return e.onlyOneConfiguration()}},views:{"system-wrap":{templateUrl:"app/installer/initial/initial-config.html",controller:"InitialConfigController as initialConfigController"},"repository-config@installer":{templateUrl:"app/survey-repository/repository.html",controller:"InitialConfigController as initialConfigController"}}}).state("login",{url:"/login",resolve:{loggedUser:function(e){return e.alreadyLogged()},initialConfiguration:function(e){return e.initialConfiguration()}},views:{"system-wrap":{templateUrl:"app/authenticator/login/login.html",controller:"LoginController",controllerAs:"loginController"}}}).state("user-register",{url:"/user/register",resolve:{initialConfiguration:function(e){return e.initialConfiguration()}},views:{"system-wrap":{templateUrl:"app/user/management/registry/user-register.html",controller:"UserRegisterController",controllerAs:"userRegisterController"}}}).state("user-activation",{url:"/user/activation",resolve:{loggedUser:function(e){return e.loggedUser()},userManagementType:[function(){return"domain"}]},views:{"system-wrap":{templateUrl:n,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@user-activation":{templateUrl:o},"system-content@user-activation":{templateUrl:"app/user/management/activation/user-activation.html",controller:"UserActivationController",controllerAs:"userActivationController"}}}).state("user-otus-management",{url:"/project/user",resolve:{loggedUser:function(e){return e.loggedUser()},selectedProject:function(e){return e.selectedProject()},userManagementType:[function(){return"otus"}]},views:{"system-wrap":{templateUrl:n,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@user-otus-management":{templateUrl:o},"system-content@user-otus-management":{templateUrl:"app/user/management/activation/user-activation.html",controller:"UserActivationController",controllerAs:"userActivationController"}}}).state("field-center",{url:"/project/centers",resolve:{loggedUser:function(e){return e.loggedUser()},selectedProject:function(e){return e.selectedProject()},loadCenters:function(e){e.loadCenters()}},views:{"system-wrap":{templateUrl:n,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@field-center":{templateUrl:o},"system-content@field-center":{templateUrl:"app/project/fieldCenter/field-center-template.html",controller:"FieldCenterController",controllerAs:"fieldCenterController"}}}).state("home",{url:"/home",resolve:{loggedUser:function(e){return e.loggedUser()}},views:{"system-wrap":{templateUrl:n,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@home":{templateUrl:o},"system-content@home":{templateUrl:"app/dashboard/template/dashboard-content-template.html"},"section-info@home":{templateUrl:"app/dashboard/home/home-info-section.html"},"section-view@home":{templateUrl:"app/dashboard/home/home-view-section.html"},"section-commands@home":{templateUrl:"app/dashboard/home/home-commands-section.html"}}}).state("offline",{url:"/offline",views:{"system-wrap":{templateUrl:"app/response-error/offline/offline.html",controller:"ResponseErrorOfflineController as controller"}}}),t.otherwise("/login")}angular.module("otusDomain").config(["$stateProvider","$urlRouterProvider",e]).constant("APP_STATE",{LOGIN:"login",USER_REGISTER:"user-register",INSTALLER:"installer",HOME:"home",USER_ACTIVATION:"user-activation",USER_ACTIVATION_IN_PROJECT:"user-otus-management",PROJECT_CENTER:"field-center",ERROR_OFFLINE:"offline"})}(),function(){function e(e,t){e.theme("layoutTheme").primaryPalette("blue",{"default":"A200","hue-1":"200"}).accentPalette("blue-grey",{"default":"900","hue-1":"50"}).warnPalette("red"),t.defaultIconSet("app/assets/img/icons/mdi.svg",24)}angular.module("otusDomain").config(["$mdThemingProvider","$mdIconProvider",e])}(),function(){"use strict";angular.module("otusDomain.dashboard",[])}(),function(){"use strict";angular.module("otusDomain.installer",["passwordControl"])}(),function(){"use strict";function e(e){function t(t){e.registerObserver(function(e){e?t.show():t.hide()})}var o={retrict:"A",controller:function(e,o,n){e.hasProject()?n.show():n.hide(),t(n)}};return o}angular.module("otusDomain.project").directive("otusWaitingProject",e),e.$inject=["ProjectContext"]}(),function(){"use strict";angular.module("otusDomain.project",[])}(),function(){"use strict";angular.module("otusDomain.repository",[])}(),function(){"use strict";angular.module("user",["user.management"])}(),function(){"use strict";function e(e,t,o,n){var r="Login Inválido! Verifique os dados informados.";e.authenticate=function(e){var i=o.getAuthenticatorResource();i.authenticate(e,function(e){e.data?(o.setSecurityToken(e.data),t.goToHome()):n.show(n.simple().textContent(r))})},e.register=function(){t.goToUserRegister()}}angular.module("otusDomain.authenticator").controller("LoginController",e),e.$inject=["$scope","DashboardStateService","RestResourceService","$mdToast"]}(),angular.module("passwordControl",[]).directive("stPassword",function(){return{require:"ngModel",restrict:"A",link:function(e,t,o,n){var r=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;e.$watch(function(){return n.$modelValue},function(e){r.test(e)&&e.length>=6&&e.length<=32?n.$setValidity("passwordPattern",!0):n.$setValidity("passwordPattern",!1)})}}}).directive("stPasswordMatch",function(){return{require:"ngModel",restrict:"A",scope:{stPasswordMatch:"="},link:function(e,t,o,n){function r(e,t){e!==t?n.$setValidity("passwordMatch",!1):n.$setValidity("passwordMatch",!0)}e.$watch(function(){return e.stPasswordMatch},function(e){r(e,n.$modelValue)}),e.$watch(function(){return n.$modelValue},function(t){r(e.stPasswordMatch,t)})}}}),function(){var e=angular.module("utils",[]);e.service("StringNormalizer",[function(){function e(e){for(var t=e.indexOf("-")!==-1?"-":".",o=e.split(t),n=o.length,r=o[0].toLowerCase(),i=1;i<n;i++){var a=o[i].slice(0,1),s=o[i].slice(1);r=r.concat(a.toUpperCase().concat(s.toLowerCase()))}return r}var t=this;t.normalizeString=e}])}(),function(){"use strict";function e(e,t,o,n,r){function i(){p.currentState="Login"}function a(){p.currentState="Login",e.go(o.LOGIN)}function s(){p.currentState="Instalador do Sistema",e.go(o.INSTALLER)}function c(){p.currentState="Cadastro de Usuário",e.go(o.USER_REGISTER)}function u(){p.currentState="Home",e.go(o.HOME)}function l(){p.currentState="Liberação de Usuários",e.go(o.USER_ACTIVATION)}function d(){p.currentState="Liberação de usuários no projeto selecionado",e.go(o.USER_ACTIVATION_IN_PROJECT)}function f(){p.currentState="Centros",e.go(o.PROJECT_CENTER)}function m(){p.currentState="Offline",e.go(o.ERROR_OFFLINE)}function g(){var e=n.getAuthenticatorResource();e.invalidate(function(){n.removeSecurityToken(),r.removeSecurityToken(),a()})}var p=this;p.goToLogin=a,p.goToHome=u,p.goToInstaller=s,p.goToUserRegister=c,p.goToUserActivation=l,p.goToUserActivationInProject=d,p.goToProjectCenters=f,p.goToErrorOffline=m,p.logout=g,i()}angular.module("otusDomain.dashboard").service("DashboardStateService",e),e.$inject=["$state","$http","APP_STATE","RestResourceService","OtusRestResourceService"]}(),function(){"use strict";function e(){}angular.module("otusDomain.dashboard").controller("HomeController",e),e.$inject=[]}(),function(){"use strict";function e(e,t,o,n,r){function i(){return t.currentState}function a(){o("left").toggle()}function s(){o("left").close()}function c(){t.goToHome(),s()}function u(){t.goToSurveyForms(),s()}function l(){t.goToUserActivation(),s()}function d(){t.goToUserActivationInProject(),s()}function f(){t.goToProjectCenters(),s()}function m(){e.showDialog().onConfirm(t.logout)}function g(){return r.hasProject()}function p(){return r.getCurrentProject()}function v(){n.choose()}var h=this;h.getSelectedSystemArea=i,h.open=a,h.close=s,h.openHome=c,h.openSurveyForms=u,h.openUserActivation=l,h.logout=m,h.chooseProject=v,h.hasSelectedProject=g,h.getCurrentProject=p,h.openProjectCenters=f,h.openUserActivationInProject=d}angular.module("otusDomain.dashboard").controller("DashboardMenuController",e),e.$inject=["LogoutDialogService","DashboardStateService","$mdSidenav","ProjectSelectionService","ProjectContext"]}(),function(){"use strict";function e(e,t,o,n,r,i){function a(){v=i.getRepositoryResource(),h=i.getInstallerResource()}function s(e){o.isLoading=!0,h.config(e,function(e){e.data?u():c(e.MESSAGE),o.isLoading=!1})}function c(e){t.show(t.simple().textContent(j))}function u(){var e=n.alert().title("Informação").content(C).ok("ok");n.show(e)["finally"](function(){r.goToLogin()})}function l(e){h.validationEmail(e,function(e){m(e.data)})}function d(e){v.validateCredentials(e,function(e){g(e.data)})}function f(e){v.validateConnection(e,function(e){p(e.data)})}function m(e){o.initialConfigSystemForm.emailSenderEmail.$setValidity("emailService",e),o.initialConfigSystemForm.$setValidity("emailService",e)}function g(e){o.initialConfigSystemForm.repositoryUsername.$setValidity("credentials",e),o.initialConfigSystemForm.repositoryPassword.$setValidity("credentials",e),o.initialConfigSystemForm.$setValidity("credentials",e)}function p(e){o.initialConfigSystemForm.repositoryHost.$setValidity("connection",e),o.initialConfigSystemForm.repositoryPort.$setValidity("connection",e),o.initialConfigSystemForm.$setValidity("credentials",e)}self=this;var v,h,C="Seu cadastro foi realizado com sucesso! Você vai ser redirecionado para a tela de login.",j="Houve um erro ao instalar seu projeto. Verifique os dados informados";self.register=s,self.validateEmailService=l,self.validateCredentials=d,self.validateRepositoryConnection=f,self.validateEmailService=l,a()}angular.module("otusDomain.installer").controller("InitialConfigController",e),e.$inject=["$q","$mdToast","$scope","$mdDialog","DashboardStateService","RestResourceService"]}(),function(){"use strict";function e(e){function t(e){c=e,a()}function o(){return c}function n(){return null!==c}function r(t){var o=e.getOtusProjectResource();o.fetchAll(function(e){u=e.data,t(u)})}function i(e){l.push(e)}function a(){l.forEach(function(e){e(c)})}var s=this,c=null,u=[],l=[];s.setProject=t,s.hasProject=n,s.getCurrentProject=o,s.loadProjects=r,s.registerObserver=i}angular.module("otusDomain.project").service("ProjectContext",e),e.$inject=["RestResourceService"]}(),function(){"use strict";function e(e,t){function o(){e.hasProject()||n()}function n(){e.loadProjects(function(e){r(e)})}function r(e){t.show({controller:"ProjectChooseController as projectChoose",templateUrl:"app/project/context/dialog/project-choose-template.html",parent:angular.element(document.body),clickOutsideToClose:!0,fullscreen:!0,locals:{projects:e}})}var i=this;i.choose=n,i.initialChoose=o}angular.module("otusDomain.project").service("ProjectSelectionService",e),e.$inject=["ProjectContext","$mdDialog"]}(),function(){"use strict";function e(){function e(e){t.fieldCenters=e}var t=this;t.fieldCenters=[],t.setFieldCenters=e}angular.module("otusDomain.project.fieldCenter").service("ProjectFieldCenterContext",e)}(),function(){"use strict";function e(e,t,o){function n(){return e.getCenters()}function r(e){e.editMode=!e.editMode}function i(t){e.update(t,function(e){e.hasErrors||o.show(o.simple().textContent(s))})}function a(){t.show({templateUrl:"app/project/fieldCenter/dialog/create-field-center-template.html",clickOutsideToClose:!0,controller:"CreateFieldCenterController",controllerAs:"createFieldCenter"})}var s="Centro atualizado",c=this;c.getAllCenters=n,c.edit=r,c.create=a,c.update=i}angular.module("otusDomain.project.fieldCenter").controller("FieldCenterController",e),e.$inject=["ProjectFieldCenterService","$mdDialog","$mdToast"]}(),function(){"use strict";angular.module("otusDomain.project.fieldCenter",[])}(),function(){"use strict";function e(e,t){function o(){return t.fieldCenters}function n(){var o=e.getOtusFieldCenterResource();o.getAll(function(e){t.setFieldCenters(e.data)},function(){t.setFieldCenters([])})}function r(t,o){var r=e.getOtusFieldCenterResource();r.create(t,function(e){n(),o(e)})}function i(t,o){delete t.editMode;var r=e.getOtusFieldCenterResource();r.update(t,function(e){n(),o(e)})}var a=this;a.loadCenters=n,a.getCenters=o,a.create=r,a.update=i}angular.module("otusDomain.project.fieldCenter").service("ProjectFieldCenterService",e),e.$inject=["OtusRestResourceService","ProjectFieldCenterContext"]}(),function(){"use strict";function e(){function e(e){var o=e.projectName,n=e.projectToken;return new t(n,o)}var o=this;return o.create=e,o}function t(e,t){var o=this;o.projectToken=e,o.projectName=t}angular.module("otusDomain.project").factory("ProjectAuthenticationFactory",e)}(),function(){"use strict";function e(e,t,o,n){function r(t){e.setUrl(t.projectRestUrl);var o=e.getOtusInstallerResource();o.ready(function(e){t.status=e.data},function(){t.status=!1})}function i(o){var r=t.defer();e.setUrl(o.projectRestUrl);var i=n.create(o),a=e.getOtusAuthenticatorResource();return a.authenticateProject(i,function(e){e.data?r.resolve(e):r.reject(e)}),r.promise}var a=this;a.isOnline=r,a.authenticate=i}angular.module("otusDomain.project").service("ProjectSecurityService",e),e.$inject=["OtusRestResourceService","$q","ProjectContext","ProjectAuthenticationFactory"]}(),function(){function e(e){e.interceptors.push("otusDomain.ResponseInterceptor")}angular.module("otusDomain").config(["$httpProvider",e])}(),function(){"use strict";function e(e){function t(t){e.get("DashboardStateService");return t}var o=this;return o.responseError=t,o}angular.module("otusDomain").factory("otusDomain.ResponseInterceptor",e),e.$inject=["$injector"]}(),function(){"use strict";function e(e){function t(){e.goToLogin()}var o=this;o.tryAgain=t}angular.module("otusDomain").controller("ResponseErrorOfflineController",e),e.$inject=["DashboardStateService"]}(),function(){"use strict";function e(e){function t(){a=e.getRepositoryResource()}function o(e){a.create(e,function(e){return!e.data.hasError})}function n(e){a.validateConnection(e,function(e){return e.data})}function r(e){a.getByRepositoryName({repositoryName:e.name},function(e){return e.data})}function i(e){a.validateCredentials(e,function(e){return e.data})}var a,s=this;s.createRepository=o,s.validateRepositoryConnection=n,s.validateIfRepositoryAlreadyExists=r,s.validateRepositoryCredentials=i,t()}angular.module("otusDomain.repository").service("RepositoryService",e),e.$inject=["RestResourceService"]}(),function(){"use strict";angular.module("user.management",["passwordControl"])}(),function(){"use strict";function e(e){function o(){a.dialogSettings={parent:angular.element(document.body),templateUrl:"app/dashboard/dialog/logout/logout-dialog.html",controller:t,controllerAs:"controller",openFrom:"#system-toolbar",closeTo:{bottom:0}}}function n(){return e.show(a.dialogSettings).then(r,i),{onConfirm:function(e){a.callback=e}}}function r(e){"confirm"===e.action&&a.callback&&a.callback(e.data)}function i(e){}var a=this;a.showDialog=n,o()}function t(e){function t(t){e.hide(t)}function o(t){e.hide(t)}var n=this;n.cancel=t,n.confirm=o}angular.module("otusDomain.dashboard").service("LogoutDialogService",e),e.$inject=["$mdDialog"]}(),function(){"use strict";function e(e,t,o,n,r,i,a){function s(){u(h.projects),d()}function c(){t.cancel()}function u(e){e.forEach(function(e){n.isOnline(e)})}function l(e){e.status?n.authenticate(e).then(function(t){f(t.data,e),c()},function(){d(),g()}):m()}function d(){if(i.hasProject()){var e=i.getCurrentProject();a.setUrl(e.projectRestUrl),a.setSecurityToken(e.sessionToken)}}function f(e,t){t.sessionToken=e,a.setSecurityToken(t.sessionToken),i.setProject(t)}function m(){r.show(r.simple().textContent(p))}function g(){r.show(r.simple().textContent(v))}var p="Projeto Offline. Verifique o estado do projeto.",v="Erro ao realizar autenticação no projeto",h=this;h.projects=o,h.close=c,h.select=l,s()}angular.module("otusDomain.project").controller("ProjectChooseController",e),e.$inject=["$scope","$mdDialog","projects","ProjectSecurityService","$mdToast","ProjectContext","OtusRestResourceService"]}(),function(){"use strict";function e(e,t,o,n){function r(){t.cancel()}function i(e){o.create(e,function(t){t.hasErrors?a(e,t):(c(),r())})}function a(t,o){e.createForm.acronym.$setValidity(o.data.errorType,!1)}function s(){e.createForm.acronym.$setValidity("ALREADY_EXIST",!0)}function c(){n.show(n.simple().textContent(u))}var u="Centro Adicionado com Sucesso",l=this;l.close=r,l.create=i,l.resetValidation=s}angular.module("otusDomain.project.fieldCenter").controller("CreateFieldCenterController",e),e.$inject=["$scope","$mdDialog","ProjectFieldCenterService","$mdToast"]}(),function(){"use strict";function e(e,t,o,n,r,i,a,s){function c(){"domain"===s?(C=n,u()):(C=r,l()),p()}function u(){t.headerDomain=!0,t.headerOtus=!1}function l(){t.headerDomain=!1,t.headerOtus=!0}function d(e){e.enable?m(e):g(e)}function f(e){var t=i.confirm().title(h).textContent(v).ok("Sim").cancel("Cancelar");i.show(t).then(function(){d(e)},function(){e.enable=!e.enable})}function m(e){var t=C.getUserResource();t.enable(e,function(){a.show(a.simple().textContent("Usuário habilitado."))})}function g(e){var t=C.getUserResource();t.disable(e,function(){a.show(a.simple().textContent("Usuário desabilitado."))})}function p(){var e=C.getUserResource();e.list(function(e){t.users=e.data})}var v="Você tem certeza que deseja alterar o status do usuário ?",h="Mudança de Estatus",C=null;t.users=[],t.loadUsers=p,t.changeStatus=d,t.confirmDialog=f,t.headerDomain=!1,t.headerOtus=!1,c()}angular.module("user.management").controller("UserActivationController",e),e.$inject=["$http","$scope","$filter","RestResourceService","OtusRestResourceService","$mdDialog","$mdToast","userManagementType"]}(),function(){function e(e,t,o,n){function r(e){var t=n.getUserResource();t.create(e,function(e){e.data&&a()})}function i(){o.goToLogin()}function a(){var e=t.alert().title("Informação").content(s).ok("ok");t.show(e)["finally"](function(){o.goToLogin()})}var s="Sua liberação está pendente de aprovação.",c=this;c.register=r,c.back=i}angular.module("user.management").controller("UserRegisterController",e),e.$inject=["$http","$mdDialog","DashboardStateService","RestResourceService"],angular.module("user.management").directive("unique",["$http","$q","RestResourceService",function(e,t,o){return{restrict:"A",require:"ngModel",link:function(e,n,r,i){i.$asyncValidators.emailInUse=function(e){var n=t.defer(),r=o.getUserResource();return r.exist({email:e},function(e){e.data?n.reject():n.resolve()}),n.promise}}}}])}();