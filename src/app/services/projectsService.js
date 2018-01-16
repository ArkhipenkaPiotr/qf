var projectsFactory = function ($http, $httpParamSerializer, requestFactory) {
    const API_BASE = "http://localhost:8765/project/";
    return {
        projects: function (stafferId) {
            var request = {
                method: 'GET',
                url: requestFactory.url(API_BASE+"projects?stafferId="+stafferId),
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                },
                data:{}
            };
            return $http(request);
        },
        deleteProject: function (projectId, stafferId) {
            var request = {
                method: 'DELETE',
                url: requestFactory.url(API_BASE+"projects?stafferId="+stafferId+"&projectId="+projectId),
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                // data:{
                //     stafferId : stafferId,
                //     projectId : projectId
                // }
            };
            return $http(request);
        },
        postProjectOfUser: function (projectName, stafferId) {
            var request = {
                method: 'POST',
                url: requestFactory.url(API_BASE+"projects?stafferId="+stafferId+"&projectName="+projectName),
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                // data:{
                //     stafferId : stafferId,
                //     projectName : projectName
                // }
            };
            return $http(request);
        }
    };
}
projectsFactory.$inject = ['$http', '$httpParamSerializer', 'requestFactory']

export default projectsFactory