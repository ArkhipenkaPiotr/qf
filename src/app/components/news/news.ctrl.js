import logo from '../../../assets/icons/logo.svg'
import close from '../../../assets/icons/close.svg'
import menu from '../../../assets/icons/menu.svg'
import logout from '../../../assets/icons/logout.svg'
import delicon from '../../../assets/icons/delete.svg'
import edit from '../../../assets/icons/edit.svg'

class NewsCtrl {
    constructor($scope, $http, $location,  store, $stateParams, newsService, requestFactory, $sce) {
        $scope.staffer = store.get('staffer');
        $scope.role = store.get('role');
        $scope.logo = logo;
        $scope.close = close;
        $scope.menu = menu;
        $scope.logoutIcon = logout;
        $scope.delicon = delicon;
        $scope.edit = edit;
        $scope.url = requestFactory.url;
        $scope.downloadedNews = 0;
        $scope.loading = false;
        $scope.category="important";
        $scope.news = [];

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




        $scope.expand = "";

        $scope.trustAsHtml = function (value) {
            return $sce.trustAsHtml(value);
        };

        $scope.addMoreNews = function () {
            if (!$scope.loading) {
                $scope.loading = true;
                newsService.news($scope.downloadedNews, $scope.category).then(function (result) {
                    console.log("RESULT: "+result.data);
                    for (var i = 0; i < 5; i++) {
                        if (!result.data[i]) {
                            break;
                        }
                        $scope.news.push(result.data[i]);
                        console.log("RESULT NEWS: "+$scope.news);
                        $scope.downloadedNews += 5;
                    }
                    $scope.loading = false;
                }, function (result) {
                    requestFactory.errorCallback(result);
                });
            }
        };


        $scope.switchToImportant = function () {
            $scope.category = 'important';
            newsService.news(0, $scope.category).then(function (result) {
                $scope.news=result.data;
                $scope.downloadedNews=5;
            }, function (result) {
                requestFactory.errorCallback(result);
            });
        };

        $scope.switchToDaily = function () {
            $scope.category = 'daily';
            newsService.news(0, $scope.category).then(function (result) {
                $scope.news=result.data;
                $scope.downloadedNews=5;
            }, function (result) {
                requestFactory.errorCallback(result);
            });
        };

        $scope.deleteStory = function (id) {
            newsService.deleteStory(id).then(function (result) {
                console.log("delete result: "+result);
                $scope.news.splice(findIndexById(id),1);
            },function (result) {
                console.log("delete bad result"+result);
            });
        }

        var findIndexById = function(id){
            var i=0;
            for (var t in $scope.news){
                if (t.id == id){
                    return i;
                }
                i++;
            }
        }
        $scope.isAdmin = function () {
            console.log($scope.role);
            return $scope.role == 'admin'||$scope.profile===$scope.staffer;
        };

    }
};

export default NewsCtrl;