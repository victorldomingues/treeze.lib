var url;
if(treeze_api_url == '')
{
  url = 'http://192.168.99.100/api/records';
  //url = "http://localhost:3006/";
}
else {
  url = treeze_api_url + 'records/';
}
var headers = {};
headers.Authorization =  localStorage.getItem('access_token');

angularTzModule.factory('accountsResourceFactory',['$resource', function($resource){
  var options = {};
  var methodsOptions = {
    get: {method: 'GET', headers: headers },
    save: {method: 'POST', headers: headers}
  };
  return $resource(url + 'accounts', options, methodsOptions);
}])

.factory('accountIdResourceFactory' , ['$resource', function($resource){
  var options = {};
  var methodsOptions = {
    get:  { method: 'GET', headers: headers},
    update: { method: 'PUT', headers: headers },
    delete: { method: 'DELETE', headers: headers}
  };
  return $resource(url + 'accounts/:id', options, methodsOptions);
}])

.factory('findByEmailResourceFactory', ['$http', function($http){
  return function(params){
    var email = params.email;
    var restResource = $http({"method": "GET", "url": url + 'accounts/find-by-email/' + email, "headers": headers });
    return restResource;
  };
}])

.factory('findByUsernameResourceFactory', ['$http', function($http){
  return function(params){
    var username = params.username;
    var restResource = $http({"method": "GET", "url": url + 'accounts/find-by-username/' + username, "headers": headers });
    return restResource;
  };
}])


.factory('customFieldsResourceFactory', ['$resource', function($resource){
  var options = {};
  var methodOptions = {
    save: { method: 'POST', "headers": headers},
    get: {method: 'GET', "headers": headers}
  };
  return $resource(url + 'custom-fields', options, methodOptions);
}])

.factory('customFieldsIdResourceFactory', ['$resource', function($resource){
  var options = {};
  var methodOptions = {
    get:  {method: 'GET', "headers": headers},
    update: {method: 'PUT', "headers": headers},
    delete: {method: 'DELETE', "headers": headers}
  };
  return $resource(url + 'custom-fields/:id', options, methodOptions)
}])

.factory('findCustomFieldsResourceFactory', ['$resource', function($resource){
  var options = {};
  var methodOptions = {
    get : {method: 'GET', "headers": headers}
  };
  return $resource(url + 'custom-fields/account-type/:accountType/section/:section', options, methodOptions)
}])

.factory('currentCountryGetFactory', ['$resource', function($resource){
  return $resource(url + 'systemsettings/country/:companyId', {}, {
    get: {method: 'GET', "headers": headers}
  });
}]);
