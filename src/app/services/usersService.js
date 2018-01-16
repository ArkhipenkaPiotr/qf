var usersFactory = function ($http, $httpParamSerializer, requestFactory) {
    const API_BASE = "http://localhost:8765/staff/";
    return {
        users : function() {
            // $http.defaults.headers.common.Authorization =
            //     'Bearer ' + access_token;
            // $http.defaults.headers.common.Content_type = "application/x-www-form-urlencoded; charset=utf-8";
            var request = {
                method: 'GET',
                url: requestFactory.url(API_BASE+"users"),
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                data:{}
            };
            return $http(request);
        },
        user: function (id) {
            var request = {
                method: 'GET',
                url: requestFactory.url(API_BASE+"users/"+id),
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                data:{}
            };
            return $http(request);
        },
        postUser: function (user) {
            var request = {
                method: 'POST',
                url: requestFactory.url(API_BASE+"users"),
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                data:{
                    id:user.id,
                    firstName:user.firstName,
                    dateOfBirth: user.dateOfBirth,
                    lastName:user.lastName,
                    position:user.position,
                    photoUrl:user.photoUrl,
                    address_id:user.address_id
                }
            };
            return $http(request);
        },

        postImage: function (image, encoded_bytes) {
            var request = {
                method: 'POST',
                url: requestFactory.url(API_BASE+"images"),
                //  headers: {
                //      "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                data:{
                    url:image.name,
                    photo: encoded_bytes
                }
            };
            console.log(request);
            return $http(request);
        }
    };
}
usersFactory.$inject = ['$http', '$httpParamSerializer', 'requestFactory']

export default usersFactory