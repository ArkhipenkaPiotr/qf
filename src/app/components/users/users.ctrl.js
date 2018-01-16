import logo from '../../../assets/icons/logo.svg'
import close from '../../../assets/icons/close.svg'
import menu from '../../../assets/icons/menu.svg'
import logout from '../../../assets/icons/logout.svg'

class UsersCtrl {
    constructor($scope, $q, $http, $location, store, usersService, requestFactory, addressService) {
        $scope.staffer = store.get('staffer');
        $scope.logo = logo;
        $scope.close = close;
        $scope.menu = menu;
        $scope.logoutIcon = logout;
        $scope.url = requestFactory.url;
        $scope.searchKeyWord = "";

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

        $q.all([usersService.users(),addressService.addresses()]).then(([users, addresses]) => {
            console.log("Success "+users);
            $scope.users = users.data.map(user => {
                user.address = addresses.data.find(({ id }) => user.address_id === id);
                return user
            });
            console.log($scope.users);
        }, function (result) {
            console.log("not succ"+result);
            requestFactory.errorCallback(result);
        });
    }
};

export default UsersCtrl;