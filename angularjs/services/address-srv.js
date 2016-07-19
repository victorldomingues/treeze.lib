(function () {
    'use strict';

    var url = treeze_api_url;
   if(treeze_api_url == "")
        url = "http://192.168.99.100/api/address/";
    else
        url = treeze_api_url + 'address/';

    angularTzModule.factory("countries", function ($resource) {
        return $resource(url + "countries/:country/:state/:city", {country: "@country", state: "@state", city: "@city"},
            {
                'get': { method: 'GET', isArray: false, cache: false }
            });     
    });
}());