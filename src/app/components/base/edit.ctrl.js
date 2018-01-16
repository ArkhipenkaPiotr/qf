class BaseCtrl {
    constructor($scope, $http, $location,  store) {
        if (store.get('access_token')&&store.get('staffer')){
            $location.path('/news');
        }
        else{
            $location.path('/login');
        }
    }
};

export default BaseCtrl;