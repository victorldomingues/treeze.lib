(function(){
	
	var app = angular.module('treeze.lib.angularjs.factories',[]);
	
	app.factory('ApiCodeResponse',function(){
		return {
			'NOT_FOUND': 1
		}
	})
	
	 /* this factory return only url and not a resource */
	 /* upload library have method of send file  angular file-upload */
	  
	angularTzModule.factory('getFileUploadUrls', function(){
		return{
			getFileUrl: function(url){
				var service_url = "";
				   if(url == ""){
           				service_url = "http://localhost:3004/file/";
       			  }else{
          			    service_url = treeze_api_url + 'filesystem/file/'
       		 }
				
       			 return service_url;
				
			},
			sendFileUrl: function(url){
				var service_url = "";
				 if(url == ""){
           				service_url = "http://localhost:3004/upload";
       			 }else{
          				 service_url = treeze_api_url + 'filesystem/upload'
        		 }
				 
        		return service_url;
			}
		}
	})
	
	
	
	
})();