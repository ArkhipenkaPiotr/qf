var addressFactory = function ($http, $httpParamSerializer, requestFactory) {
    const API_BASE = "http://localhost:8765/address/";
    return {
        addresses: function () {
            var request = {
                method: 'GET',
                url: requestFactory.url(API_BASE+"addresses"),
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                data:{}
            };
            return $http(request);
        },
        address: function (id) {
            var request = {
                method: 'GET',
                url: requestFactory.url(API_BASE+"addresses/"+id),
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                data:{}
            };
            return $http(request);
        },
        postAddress: function (address) {
            var request = {
                method: 'POST',
                url: requestFactory.url(API_BASE+"addresses"),
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                data:{
                    id: address.id,
                    eMail: address.eMail,
                    skype: address.skype,
                    phone: address.phone,
                    room: address.room
                }
            };
            return $http(request);
        }

    };
}
addressFactory.$inject = ['$http', '$httpParamSerializer', 'requestFactory']

export default addressFactory