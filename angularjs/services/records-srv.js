(function(){
	'use strict';
	
		var apiUrl = null;
			if (treeze_api_url == "") {
				apiUrl = "http://localhost:3006/";
			}
			else {
				apiUrl =  treeze_api_url;
			}
            
            
            
   angularTzModule.factory('uniqueLoginFactory', ['$http', function ($http) {
      return function (params) {
        var login = params.login;
        var companyId = params.companyId;
        var accountId = params.id;
        var url = '';
        var path = ''
        if (accountId) {
          url = apiUrl + "accounts/find-by-login/"+ login;
        }
        else {
          url = apiUrl + "accounts/find-by-login/"+ login;
        }

        var restResource = $http({ "method": "GET", "url": url });
        return restResource;
      }
    }])
    
    //via resource
    angularTzModule.factory('accountFactory', ['$resource', function ($resource) {
      return $resource(apiUrl + 'accounts/:id', {}, {
          get: { method: 'GET' },
          update: { method: 'PUT' },
          remove: { method: 'DELETE' }
        });
    }])
	
    //via querystring
    angularTzModule.factory('accountsFactory', ['$resource', function ($resource) {
      return $resource(apiUrl +  'accounts/', {}, {
          get: { method: 'GET' }
        });
    }])
	
    angularTzModule.factory('accountCustomFormsFactory', ['$resource', function ($resource) {
      return $resource( apiUrl + 'account-custom-forms/:companyId', {}, {
          update: { method: 'PUT' },
          get: { method: 'GET' }
        })
    }])

    angularTzModule.factory('customFormsPostFactory', ['$resource', function($resource){
      return $resource(apiUrl + 'account-custom-forms/', {}, {
        save: {method: 'POST'}
      })
    }])




    angularTzModule.factory('accountPostFactory', ['$resource', function ($resource) {
      return $resource(apiUrl + 'accounts/', {}, {
          save: { method: 'POST', cache: false, isArray: false },
        });
    }])

   

  
    
    angularTzModule.factory('accountDeleteFactory', ['$resource', function ($resource) {
      return $resource(apiUrl + "accounts/:id/", {id :'@id', reason: '@reason'}, {
          remove: { method: 'DELETE' }
        });
    }])
    
    
    
	
})();



