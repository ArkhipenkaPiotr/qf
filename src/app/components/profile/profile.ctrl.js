import logo from '../../../assets/icons/logo.svg'
import close from '../../../assets/icons/close.svg'
import menu from '../../../assets/icons/menu.svg'
import logout from '../../../assets/icons/logout.svg'

class ProfileCtrl {
    constructor($scope, $http, $location, store, $stateParams, usersService, requestFactory, addressService, projectsService) {
        $scope.staffer = store.get('staffer');
        $scope.role = store.get('role');
        $scope.logo = logo;
        $scope.close = close;
        $scope.menu = menu;
        $scope.logoutIcon = logout;
        $scope.url = requestFactory.url;
        $scope.newProject = "";

        $scope.imgfile = {};

        $scope.menutexp = function() {
            var aside = angular.element( document.querySelector( '#aside' ) );
            var pageover = angular.element( document.querySelector( '#pageover' ) );
            aside.addClass('open');
            pageover.addClass('visible');
        };

        $scope.pageexp = function() {
            var aside = angular.element( document.querySelector( '#aside' ) );
            var pageover = angular.element( document.querySelector('#pageover'));

            pageover.removeClass('visible');
            if(aside.hasClass('open')){
                aside.removeClass('open')
            }
        };

        $scope.logout = function () {
            store.remove('token');
            store.remove('staffer');
            store.remove('role');
        };


        console.log("Param: "+$stateParams.param);
        if ($stateParams.param==0){
            $scope.profile = $scope.staffer;
            addressService.address($scope.profile.address_id).then(function (result) {
                $scope.address = result.data;
            });

            projectsService.projects($scope.profile.id).then(function (result) {
                $scope.projects = result.data;
                console.log($scope.projects);
            })
        }
        else{
            usersService.user($stateParams.param).then(function (result) {
                $scope.profile = result.data;

                addressService.address($scope.profile.address_id).then(function (result) {
                    $scope.address = result.data;
                });

                console.log("projects"+$scope.projects);

                projectsService.projects($scope.profile.id).then(function Suc(result) {
                    $scope.projects = result.data;
                })
            }, function (result) {
                requestFactory.errorCallback(result);
            })
        }

        $scope.isAdmin = function () {
            return $scope.role == 'admin'||$scope.profile===$scope.staffer;
        };

        $scope.postChanges = function () {
            addressService.postAddress($scope.address);
            usersService.postUser($scope.profile);
        };

        $scope.saveProject = function () {
            projectsService.postProjectOfUser($scope.newProject, $scope.profile.id).then(function (result) {
                $scope.projects.push(result.data)
            });
            $scope.newProject="";
        };

        $scope.deleteProject = function (projectId) {
            projectsService.deleteProject(projectId, $scope.profile.id);
        };
        
        $scope.saveImg = function () {
            usersService.postImage($scope.imgfile, $scope.encoded_file);
        };

        $scope.onFileSelect = function($file){
            var reader = new FileReader();
            reader.onload = function(e){
                console.log("about to encode");
                $scope.encoded_file = btoa(e.target.result.toString());
            };
            reader.readAsBinaryString($file);
        };
    }
};

export default ProfileCtrl;