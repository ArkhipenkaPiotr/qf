var newsFactory = function ($http, $httpParamSerializer, requestFactory) {
    const API_BASE = "http://localhost:8765/news/";
    return {
        news : function(startnum, category) {
            var request = {
                method: 'GET',
                url: requestFactory.url(API_BASE+'api/news?startnum='+startnum+'&category='+category)
            };
            return $http(request);
        },
        story : function(id) {
            var request = {
                method: 'GET',
                url: requestFactory.url(API_BASE+'api/news/'+id)
            };
            return $http(request);
        },
        deleteStory : function(id) {
            var request = {
                method: 'DELETE',
                url: requestFactory.url(API_BASE+'api/news/'+id)
            };
            return $http(request);
        },
        createStory: function (story) {
            var request = {
                method: 'POST',
                url: requestFactory.url(API_BASE+'api/news'),
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                data:{
                    id: story.id,
                    author: story.author,
                    category: story.category,
                    content: story.content,
                    date_time: story.date_time,
                    header: story.header
                }
            };
            return $http(request);
        },
        updateStory: function (story) {
            var request = {
                method: 'PUT',
                url: requestFactory.url(API_BASE+'api/news'),
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                // },
                data:{
                    id: story.id,
                    author: story.author,
                    category: story.category,
                    content: story.content,
                    date_time: story.date_time,
                    header: story.header
                }
            };
            return $http(request);
        }
    };
};
newsFactory.$inject = ['$http', '$httpParamSerializer','requestFactory'];

export default newsFactory