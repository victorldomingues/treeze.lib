(function () {
    'use strict';
    var url  = treeze_api_url;
    if(treeze_api_url == "")
        url = "http://192.168.99.100/api/systemSettings/";  
    else
        url = treeze_api_url + 'systemSettings/';

    angularTzModule.factory('system', function () {
        return Lockr.get('systemParameters');
    });
    angularTzModule.factory('systemSettings', function ($resource) {
        return $resource( url + "systemsettings/:id", { id: "@id" },
            {
                'get': { method:'GET', isArray: false, cache: false  },
                'save': { method: 'POST', isArray: false, cache: false  },
                'update': { method: 'PUT', isArray: false, cache: false  },
                'delete': { method: 'DELETE', isArray: false, cache: false  }
            }
        );

    });
    angularTzModule.factory('taxMethods', function(){
        return [
            {id: 1, name: "Brasil", path: "tax-data-br"},
            {id: 2, name: "Estados unidos", path: "tax-data-us"},
            {id: 3, name: "Colômbia", path: "tax-data-cl"}
        ];
    });
    angularTzModule.factory('dateFormats', function(){
        return [
            {id: 1, name: "dd/MM/yyyy (Day/Month/Year)", format: "dd/MM/yyyy"},
            {id: 2, name: "yyyy/MM/dd  (Year/Month/Dat)", format: "yyyy/MM/dd"},
            {id: 3, name: "MM/dd/yyyy  (Month/Day/Year)", format:"MM/dd/yyyy"}
        ];
    });
})();