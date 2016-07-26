(function () {
        'use strict';
    var url = treeze_api_url;
    if(treeze_api_url == "")
        url = "http://192.168.99.100/api/purchases/";  
    else
        url = treeze_api_url + 'purchases/';
        
    angularTzModule.factory("purchases", function ($resource) {
        return $resource( url + "purchases/:id", { id: "@id" },
          {
              'get': { method: 'GET', isArray: false, cache: false  },
              'update': { method: 'PUT', isArray: false, cache: false  },
              'save': { method: 'POST', isArray: false, cache: false  },
              'delete': { method: 'DELETE', isArray: false, cache: false }
          }
        );
    });
    angularTzModule.factory("processSteps", function () {
        return [
            {"_id": "0", name: "Rascunho", reference: "draft" },
            {"_id": "1", name: "Salvo e enviado", reference: "sent" },
            {"_id": "2", name: "Em conferência", reference: "conference"},
            {"_id": "3", name: "Conferido e recebido", reference: "received" }
        ];
    });
}());