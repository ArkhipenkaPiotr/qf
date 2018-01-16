var requestFactory = function ($http, $httpParamSerializer, $location, store) {
    return {
        url : function(url) {
            // $http.defaults.headers.common.Authorization =
            //      'Bearer ' + store.get('token').access_token;
            //$http.defaults.headers.common.Content_type = "application/x-www-form-urlencoded; charset=utf-8";
            console.log(url);
            if (!store.get('token')) {
                $location.path('/login');
            }
            else {
                if (url.indexOf("?")!=-1){
                    return url + "&access_token=" + store.get('token').access_token;
                }
                return url + "?access_token=" + store.get('token').access_token;
            }
        },
        errorCallback: function (result) {
            console.log(result);
            // switch (result.status){
            //     case 401:
            //         $location.path('/login');
            //         break;
            //     case -1:
            //         window.alert("Connection error! Check connection and try again");
            //         break;
            //     default:
            //         window.alert("Error "+result.status)
            //         break;
            // }
            $location.path('/login');
        }
    };
};
requestFactory.$inject = ['$http', '$httpParamSerializer', '$location', 'store']

export default requestFactory