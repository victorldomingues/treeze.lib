(function () {
        // //funcao para pegar o cookie
        // function getCookie(cname) {
        //     var name = cname + "=";
        //     var ca = document.cookie.split(';');
        //     for (var i = 0; i < ca.length; i++) {
        //         var c = ca[i];
        //         while (c.charAt(0) == ' ') c = c.substring(1);
        //         if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        //     }
        //     return "";
        // };
        'use strict';

    var treeze_api_url = "http://api.treeze.net/";

    angularTzModule.factory('sales', function ($resource) {


        return $resource(treeze_api_url + "sales/sales/all", {},
            {
                'index': { method: 'POST', isArray: true, cache: true },

            });

    });

    angularTzModule.factory('salesDetail', function ($resource) {


        return $resource(treeze_api_url + "sales/sales/detail/", {},

             {
                 'index': { method: 'GET', isArray: false, cache: true }
             });


    });

    angularTzModule.factory('paymentMethods', function($resource){
        return $resource(treeze_api_url + 'sales/sales/payment-methods', {},
        {
            'index': { method: 'GET', isArray: true, cache: true }
        });
    });

    angularTzModule.factory('paymentMethodsReport', function($resource){
        return $resource(treeze_api_url + 'sales/sales/payment-methods-reports', {},
        {
            'index': { method: 'POST', isArray: true, cache: true }
        });
    });

    angularTzModule.factory('stockOutPut', function($resource){
        return $resource(treeze_api_url + 'sales/sales/stock-output', {},
            {
                'get': { method: 'POST', isArray: false, cache: false }
            });
    });

    angularTzModule.factory("sellersRanking", function ($resource) {
        return $resource(treeze_api_url + "sales/sellers/top"/* + "emporiodoaco"*/, {},
            //return $resource("http://localhost/Treeze.Api.Vendas/sellers/top", { },
            {
                'index': { method: 'POST', isArray: true, cache: true },
            });

    });

    angularTzModule.factory("companySellersRanking", function ($resource) {
        return $resource(treeze_api_url + "sales/sellers/by-company"/* + "emporiodoaco"*/, {},
            {
                'index': { method: 'POST', isArray: true, cache: true },
            });

    });

    angularTzModule.factory('streamSellersranking', ['$rootScope',
        function ($rootScope) {

            return {
                //on: function (eventName, callback) {
                //    var connection = $.hubConnection(" http://api.treeze.net/sales");
                //    var ticketHubProxy = connection.createHubProxy('sellers/top');

                //    ticketHubProxy.on(eventName, function () {
                //        var args = arguments;
                //        $rootScope.$apply(function () {
                //            callback.apply(ticketHubProxy, args);
                //        });
                //    });

                //    connection.start({ jsonp: true }).done(function () { });

                //}
            };


        }]);

    angularTzModule.factory("companiesRanking", function ($resource) {
        return $resource(treeze_api_url + "sales/companies/ranking"  /* + "emporiodoaco"*/, {},
            {
                'index': { method: 'POST', isArray: true, cache: true },
            });
    });

    angularTzModule.factory("productsGroupRanking", function ($resource) {
        return $resource(treeze_api_url + "sales/products-category/top" /* + "emporiodoaco"*/, {},
            {
                'index': { method: 'POST', isArray: true, cache: true },
            });
    });

    angularTzModule.factory("productsRanking", function ($resource) {
        return $resource(treeze_api_url + "sales/products/top" /*+ "emporiodoaco"*/, {},
            {
                'index': { method: 'POST', isArray: true, cache: true },
            });
    });

    angularTzModule.factory("photogravacaoRanking", function ($resource) {
        return $resource(treeze_api_url + "pdv/indicadores/ranking-vendedoras" + "emporiodoaco", {},
            {
                'index': { method: 'POST', isArray: true, cache: true, headers: { 'Content-Type': 'application/json' } },
            });
    });

    /*Ticket Médio */
    angularTzModule.factory("averageTicket", function ($resource) {
        return $resource(treeze_api_url + "sales/avg-ticket/by-company", {},
            {
                'index': { method: 'POST', isArray: false, cache: true }
            });

    });
    /*Valor do faturamento */
    angularTzModule.factory("billingValue", function ($resource) {
        return $resource(treeze_api_url + "sales/companies/billing", {}, {
            'index': {method: 'POST', isArray:false, cache:true }
        });
    });

    angularTzModule.factory("averageTicketBySeller", function ($resource) {
        return $resource(treeze_api_url + "sales/avg-ticket/by-seller", {},
            {
                'index': { method: 'POST', isArray: false, cache: true }
            });
    });

    angularTzModule.factory("partsForServiceByCompany", function ($resource) {
        return $resource(treeze_api_url + "sales/avg-itens/by-company", {},
            {
                'index': { method: 'POST', isArray: false, cache: true }
            });
    });

    angularTzModule.factory("partsForServiceBySeller", function ($resource) {
        return $resource(treeze_api_url + "sales/avg-itens/by-seller", {},
            {
                'index': { method: 'POST', isArray: false, cache: true }
            });
    });

    angularTzModule.factory("productsRankingByCompany", function ($resource) {
        return $resource(treeze_api_url + "sales/products/top-by-company", {},
            {
                'index': { method: 'POST', isArray: true, cache: true }
            });
    });

    angularTzModule.factory("productsRankingBySeller", function ($resource) {
        return $resource(treeze_api_url + "sales/products/top-by-seller", {},
            {
                'index': { method: 'POST', isArray: true, cache: true }
            });
    });

    angularTzModule.factory("productsGroupRankingByCompany", function ($resource) {
        return $resource(treeze_api_url + "sales/products-category/top-by-company", {},
            {
                'index': { method: 'POST', isArray: true, cache: true }
            });
    });

    angularTzModule.factory("productsGroupRankingBySeller", function ($resource) {
        return $resource(treeze_api_url + "sales/products-category/top-by-seller", {},
            {
                'index': { method: 'POST', isArray: true, cache: true }
            });
    });

}());