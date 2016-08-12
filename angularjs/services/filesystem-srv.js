(function(){
	'use strict';
	
    /* get url from shared factories */
    
	angularTzModule.factory('FileSystem', function(getFileUploadUrls,$resource){
		 
       var url = getFileUploadUrls.getFileUrl(treeze_api_url);
    
        return $resource(url + ':img',{img: '@img'},{
            remove: {method: 'DELETE'}
        });
	})
	
})();