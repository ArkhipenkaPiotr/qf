import logo from '../../../assets/icons/logo.svg'
class LoginCtrl {
    constructor($scope, $http, loginService, $location, store, usersService) {
        $scope.logo = logo;
        $scope.name = 'peter@example.com';
        $scope.password = 'password';
        $scope.connectionErr = false;
        $scope.badCredentials = false;

        if (store.get('token')||store.get('staffer')||store.get('role')){
            $location.path('/news');
        };

        $scope.submit = () => {
            loginService.login($scope.name, $scope.password).then(function successCallBack (result) {
                $scope.connectionErr = false;
                $scope.badCredentials = false;

                store.set('token', result.data);

                loginService.user($scope.name, $scope.password).then(function (result) {
                    var id = result.data.stafferId;
                    console.log(result.data.role);
                    store.set('role', result.data.role);
                    console.log(id);
                    usersService.user(id).then(function (result) {
                        store.set('staffer',result.data);
                        console.log("Staffer photoUrl: "+result.data.photoUrl);
                        $location.path('/users');
                    })
                });
            }, function errorCallBack (result){
                $scope.connectionErr = false;
                $scope.badCredentials = false;
                if (result.status==-1){
                    $scope.connectionErr=true;
                }
                else if (result.status==401){
                    $scope.badCredentials=true;
                }
            });
        };
    }
};

export default LoginCtrl;