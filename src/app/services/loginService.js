
var loginFactory = function ($http, $httpParamSerializer) {
    const API_BASE = "http://localhost:9999/uaa/";
    return {
        login : function(uname, pwd) {
            var data = {
                grant_type:"password",
                username: uname,
                password: pwd,
                client_id: "acme"
            };
            var request = {
                method: 'POST',
                url: API_BASE+'oauth/token',
                headers: {
                    "Authorization": "Basic " + btoa("acme:acmesecret"),
                    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                },
                data: $httpParamSerializer(data)
            };
            return $http(request);
        },
        user: function (uname, pwd) {
            var request = {
                method: 'GET',
                url: API_BASE+'user?login='+uname+'&password='+pwd
            };
            return $http(request);
        }
    };
}
loginFactory.$inject = ['$http', '$httpParamSerializer']

export default loginFactory