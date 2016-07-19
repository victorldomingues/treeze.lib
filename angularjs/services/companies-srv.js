(function () {

    var url = treeze_api_url;
   if(treeze_api_url == "")
        url = "http://192.168.99.100/api/records/";
    else
        url = treeze_api_url + 'records/';
        

    angularTzModule.factory("segments", function ($resource) {
        return $resource(url + "company/category/all", {},
            {
                'index': { method: 'GET', isArray: true, cache: true }
            });

    });

    angularTzModule.factory("companies", function ($resource) {
        return $resource(url + "company/companies/all", {},
            {
                'index': {method: 'GET', isArray: true, cache: true}
            });


    });

    angularTzModule.factory("sellersByCompany", function ($resource) {
        return $resource(url + "company/companies/sellers-by/:Id", {},
            {
                'index': { method: 'GET', isArray: true, cache: true }
            });
    })

    angularTzModule.factory("companyDetail", function ($resource) {
        return $resource(url + "company/companies/detail/:Id", { Id: "@id" },
            {
                'index': { method: 'GET', isArray: false, cache: true }
            });
    });

    angularTzModule.factory("companyResponsibles", function ($resource){
        return $resource(url + "company/companies/responsibles", { companyId: "@companyId"},
            {
                'get': { method: 'GET', isArray: true, cache: false }
            });
    });

}());
