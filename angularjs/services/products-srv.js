(function () {
    'use strict';
   var url = treeze_api_url; 

   if(treeze_api_url == "")
        url = "http://192.168.99.100/api/products/";
    else
        url = treeze_api_url + 'products/';
        
    angularTzModule.factory("products", function ($resource) {
        return $resource( url + "products/:id", { id: "@id" },
            {
                'get': { method: 'GET', isArray: false, cache: false  },
                'save': { method: 'POST', isArray: false, cache: false  },
                'update': { method: 'PUT', isArray: false, cache: false  },
                'delete': { method: 'DELETE', isArray: false, cache: false  }
            }
        );
    });
    angularTzModule.factory("variants", function ($resource) {
        return $resource( url + "variants/:id", { id: "@id" },
            {
                'get': { method:'GET', isArray: false, cache: false  },
                'save': { method: 'POST', isArray: false, cache: false  },
                'update': { method: 'PUT', isArray: false, cache: false  },
                'delete': { method: 'DELETE', isArray: false, cache: false  }
            }
        );
    });
    angularTzModule.factory("values", function ($resource) {
        return $resource( url + "values/:id", { id: "@id" },
            {
                'get': { method:'GET', isArray: false, cache: false  },
                'save': { method: 'POST', isArray: false, cache: false  },
                'update': { method: 'PUT', isArray: false, cache: false  },
                'delete': { method: 'DELETE', isArray: false, cache: false  }
            }
        );
    });
    angularTzModule.factory("stocks", function ($resource) {
        return $resource( url + "stocks/:id", { id: "@id" },
            {
                'get': { method:'GET', isArray: false, cache: false  },
                'save': { method: 'POST', isArray: false, cache: false  },
                'update': { method: 'PUT', isArray: false, cache: false  },
                'delete': { method: 'DELETE', isArray: false, cache: false  }
            }
        );
    });
    angularTzModule.factory("categories", function ($resource) {
        return $resource( url + "categories/:id", { id: "@id" },
            {
                'get': { method:'GET', isArray: false, cache: false  },
                'save': { method: 'POST', isArray: false, cache: false  },
                'update': { method: 'PUT', isArray: false, cache: false  },
                'delete': { method: 'DELETE', isArray: false, cache: false  }
            }
        );
    });
    angularTzModule.factory("unitMeasures", function ($resource) {
        return [
            {"_id": "1", "physicalQuantity": "Comprimento", 	            "unit": "metro", 		"symbol":"m"},
            {"_id": "2", "physicalQuantity": "Massa", 			            "unit":"quilograma", 	"symbol":"kg"},
            {"_id": "3", "physicalQuantity": "Tempo", 			            "unit":"segundo",       "symbol":"s"},
            {"_id": "4", "physicalQuantity": "Corrente elétrica", 	        "unit":"ampere", 	    "symbol":"A"},
            {"_id": "5", "physicalQuantity": "Temperatura termodinâmica", 	"unit":"kelvin", 	    "symbol":"K"},
            {"_id": "6", "physicalQuantity": "Quantidade de matéria", 	    "unit":"mol", 	        "symbol":"mol[12]"},
            {"_id": "7", "physicalQuantity": "Intensidade luminosa", 	    "unit":"candela", 	    "symbol":"cd"} 
        ]
        ;
    });
})();