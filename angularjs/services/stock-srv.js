(function () {
    var url = treeze_api_url;
   if(treeze_api_url == "")
        url = "http://192.168.99.100/api/products/";  
        // url = "http://localhost:3002/";  
    else
        url = treeze_api_url + 'products/';
        
    angularTzModule.factory('stocks', function ($resource) {
        return $resource(url + "stocks/:id", {id: "@id"},
            {
                'get': { method: 'GET', isArray: false, cache: false },
                'save': { method: 'POST', isArray: false, cache: false },
                'update': { method: 'PUT', isArray: false, cache: false },
                'delete': { method: 'DELETE', isArray: false, cache: false }
            });
    });
    angularTzModule.factory('stockProducts', function ($resource) {
        return $resource(url + "stocks/:id/products", {id: "@id"},
            {
                'get': { method: 'GET', isArray: false, cache: false }
            });
    });
    angularTzModule.factory('stockGrid', function ($resource) {
        return $resource(url + "stocks/:id/products-grid", {id: "@id", productId: '@productId'},
            {
                'get': { method: 'GET', isArray: false, cache: false }
            });
    });
})();