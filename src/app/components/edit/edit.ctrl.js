import logo from '../../../assets/icons/logo.svg'
import close from '../../../assets/icons/close.svg'
import menu from '../../../assets/icons/menu.svg'
import logout from '../../../assets/icons/logout.svg'
import delicon from '../../../assets/icons/delete.svg'
import edit from '../../../assets/icons/edit.svg'

class EditCtrl {
    constructor($scope, $http, $location,  store, $stateParams, newsService, requestFactory) {
        $scope.staffer = store.get('staffer');
        $scope.logo = logo;
        $scope.close = close;
        $scope.menu = menu;
        $scope.logoutIcon = logout;
        $scope.delicon = delicon;
        $scope.edit = edit;
        $scope.url = requestFactory.url;

        $scope.menutexp = function() {
            var aside = angular.element( document.querySelector( '#aside' ) );
            var pageover = angular.element( document.querySelector( '#pageover' ) );
            aside.addClass('open');
            pageover.addClass('visible');
        };

        $scope.pageexp = function() {
            var aside = angular.element( document.querySelector( '#aside' ) );
            var pageover = angular.element( document.querySelector('#pageover'));

            store.remove('token');
            store.remove('role');
            store.remove('staffer');

            pageover.removeClass('visible');
            if(aside.hasClass('open')){
                aside.removeClass('open')
            }
        };

        if($stateParams.param==0){
            $scope.story={
                author: $scope.staffer.firstName +" "+$scope.staffer.lastName,
                category: "daily",
                header: "header",
                content: "content",
            };
        }
        else {
            newsService.story($stateParams.param).then(function (result) {
                $scope.story = result.data;
            }, function (result) {
                requestFactory.errorCallback(result);
            });
        }

        $scope.save = function () {
            console.log("stateparam: "+$stateParams.param);
            if ($stateParams.param==0){
                $scope.addStory();
            }
            else{
                $scope.updateStory();
            }
        };

        $scope.addStory = function () {
            newsService.createStory($scope.story).then(function (result) {
                $location.path('news');
            }, function (result) {
                console.log(result);
            })
        };

        $scope.updateStory = function () {
            newsService.updateStory($scope.story).then(function (result) {
                $location.path('news');
            }, function (result) {
                console.log(result);
            })
        }
    }
};

export default EditCtrl;