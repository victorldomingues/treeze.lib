(function(){
	'use strict';
	
		var apiUrl = null;
			if (treeze_api_url == "") {
				apiUrl = "http://localhost:3006/";
			}
			else {
				apiUrl =  treeze_api_url;
			}
	
	
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
      return $resource(apiUrl + 'account/', {}, {
          save: { method: 'POST', cache: false, isArray: false },
        });
    }])

    angularTzModule.factory('accountsFactory', ['$resource', function ($resource) {
      return $resource(apiUrl +  'account/:companyId/', {}, {
          get: { method: 'GET' }
        });
    }])

    angularTzModule.factory('accountFactory', ['$resource', function ($resource) {
      return $resource(apiUrl + 'account/:companyId/:login', {}, {
          get: { method: 'GET' },
          update: { method: 'PUT' },
          remove: { method: 'DELETE' }
        });
    }])
    
    angularTzModule.factory('accountDeleteFactory', ['$resource', function ($resource) {
      return $resource(apiUrl + "account/:companyId/:login/:reason", {}, {
          remove: { method: 'DELETE' }
        });
    }])
	
})();