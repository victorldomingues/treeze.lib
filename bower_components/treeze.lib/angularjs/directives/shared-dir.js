(function () {
    var record = "'active'";

    angular.module('treeze.shared.directives', ['ui.bootstrap'])

     .directive('optionsDisabled', function($parse) {
        var disableOptions = function(scope, attr, element, data, fnDisableIfTrue) {
            // refresh the disabled options in the select element.
            $("option[value!='?']", element).each(function(i, e) {
                var locals = {};
                locals[attr] = data[i];
                $(this).attr("disabled", fnDisableIfTrue(scope, locals));
            });
        };
        return {
            priority: 0,
            require: 'ngModel',
            link: function(scope, iElement, iAttrs, ctrl) {
                // parse expression and build array of disabled options
                var expElements = iAttrs.optionsDisabled.match(/^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/);
                var attrToWatch = expElements[3];
                var fnDisableIfTrue = $parse(expElements[1]);
                scope.$watch(attrToWatch, function(newValue, oldValue) {
                    if(newValue)
                        disableOptions(scope, expElements[2], iElement, newValue, fnDisableIfTrue);
                }, true);
                // handle model updates properly
                scope.$watch(iAttrs.ngModel, function(newValue, oldValue) {
                    var disOptions = $parse(attrToWatch)(scope);
                    if(newValue)
                        disableOptions(scope, expElements[2], iElement, disOptions, fnDisableIfTrue);
                });
            }
        };
    })

    .directive('filterFormaPagamento', function () {
        return {
            restrict: 'E',
            controller: 'filterFormaPagamentoCtrl',
            template: '<div class="btn-group col-md-2 col-xs-12" style="margin-top: 1.5px;"> <select class="form-control btn btn-default treeze-select ng-pristine ng-valid ng-touched" ng-change="loadInformation()" ng-options="formaPagamento.id as formaPagamento.nome for formaPagamento in formasPagamento" ng-model="filtroGeral.PaymentMethod" ng-init="filtroGeral.PaymentMethod = 0"> </div>'
        }
    })

    .controller('filterFormaPagamentoCtrl', function ($scope, FormaPagamento){
        $scope.readyFormaPagamento = function (){
            function success (data){
                var todasFP = {
                    id: 0,
                    nome: "Todas as formas de pagamento"
                };
                data.unshift(todasFP);
                $scope.formasPagamento = data;

            };
            function failure (data){

            };
            FormaPagamento.index(success, failure);
        }
        $scope.readyFormaPagamento();
    })

    .directive('filterEmpresa', function () {
        return {
            restrict: 'E',
            controller: 'dirCtrlFilterEmpresa',
            template: '<div class="input-with-search" ><input id="input-search-company" placeholder="Todas as empresas" on-keyup-fn="searchCompanyInit" ng-click="toggleList()" class="input-search-text" type="text" ng-model="filterSearchCompaby" /> <div ng-if="filterSearchCompaby.length != 0 "  class="clear-input" ng-click="clearInputText(); loadInformation()"> x </div> <div class="arrow" ng-click="toggleList()"><i class="fa fa-angle-down"></i></div><ul class="col-md-12 col-xs-12 col-sm-12" ng-class="statusSearchboxIs" ng-mouseleave="forceClosList()"><li ng-repeat="company in companies | filter:filterSearchCompaby" ng-class="{'+ record +': $index == focusIndex }" ng-click="selectCompany(company)"> {{company.company}} <span ng-if="company.state.length != 0">, <span ng-bind="company.state" style="color:#A6A6A6;" /> </span></li></ul><input type="hidden" ng-model="filtroGeral.CompanyId"></div>'
        }
    })

    .controller('dirCtrlFilterEmpresa', function ($scope, companies, $filter, $element, $timeout) {
        $scope.filterSearchCompaby = "";
        $scope.statusSearchboxIs = "close";
        $scope.focusIndex = 0;
        $scope.getCompanies = function () {
            function success(data) {
                var todasAsEmpresas = {
                    companyId: "",
                    company: i18n.t('configuration.filters.allCompanies') != undefined ? i18n.t('configuration.filters.allCompanies') :  "Todas as empresas"
                };
                $scope.companies = data;
                if(data.length > 1){
                    $scope.companies.unshift(todasAsEmpresas);
                }else{
                    // $scope.filtroGeral.companyId = data[0].companyId;
                    $scope.companies.unshift(todasAsEmpresas);
                }
                $scope.focusIndex = 0;

            };

            function failure(data) {

            };
            companies.index(success, failure);
        };
        $scope.getCompanies();
        $scope.toggleList = function(){
            if($scope.statusSearchboxIs == "close"){
                $scope.statusSearchboxIs = "open";
            }else{
                $scope.statusSearchboxIs = "close";
            }
        };
        $scope.selectCompany = function(company){
            $scope.filtroGeral.CompanyId = company.companyId;
            $scope.filterSearchCompaby = company.company;
            // $scope.focusIndex = company;
            $scope.toggleList();
            $scope.loadInformation();

            if ($scope.filtroGeral.CompanyId != 1 && $scope.filtroGeral.CompanyId != "" && $scope.filtroGeral.CompanyId != undefined && $scope.getSellers  != undefined) {
                $scope.getSellers($scope.filtroGeral.CompanyId);
            }
        };
        $scope.searchCompanyInit = function(key){
            if(key != 27){
                $scope.statusSearchboxIs = "open";
            }
            // $scope.focusIndex = 0;
            if(key == 40){
                $scope.focusIndex++;
            }else if(key == 38){
                $scope.focusIndex--;
            } else if(key == 13){
                var index = $scope.focusIndex;
                var list = $filter('filter')($scope.companies, $scope.filterSearchCompaby);
                var foundItem = list[index];
                $scope.selectCompany(foundItem);
                $scope.loadInformation();
            }else if(key == 27){
                if($scope.filterSearchCompaby = ""){
                    $scope.clearInputText();
                    $scope.loadInformation();
                }else{
                    $scope.focusIndex = 0;
                    $scope.toggleList();
                }
            }else{
                $scope.focusIndex = 0;
            }
        };
        $scope.clearInputText = function (){
            $scope.filterSearchCompaby = "";
            $scope.filtroGeral.CompanyId = "";
            $scope.focusIndex = 0;
            $timeout(function() {
                var input = angular.element($('#input-search-company'));
                input.focus();
            });
        };
        $scope.forceClosList = function (){
            $scope.statusSearchboxIs = "close";
        };
        $scope.t = {
            allCompanies:  i18n.t('configuration.filters.allCompanies') != undefined ? i18n.t('configuration.filters.allCompanies') :  "Todas as empresas"
        }

        $scope.setPlaceHolder =  function(){
            $('#input-search-company').attr("placeholder", $scope.t.allCompanies)
        }
        $scope.setPlaceHolder();
    })

    .directive('termosDeUso', function () {
        return {
            restrict: 'E',
            controller: 'TermosDeUsoCtrl',
            template: '    <div class="content-scroll"> <div style="padding:30px;" ng-bind-html="terms.html" ></div> <br> <center> <div style="padding: 10px 20px; height:auto;" ng-if="terms.systemContractUser.subscriptionStatus == 0 || terms.subscriptionStatus  == false" class="btn btn-success" ng-click="aceitarTermos()"> Li e aceito os termos de uso </div><div ng-else class="btn btn-default">Os termos de uso foram aceitos.</div></center> </div>'
        }
    })

    .controller('TermosDeUsoCtrl', function ($scope, $location, TermsOfService, AcceptTermsOfService) {
        $scope.status = false;
        $scope.terms = {};
        $scope.aceitarTermos = function(){
            function s (d){
                $scope.terms.systemContractUser.subscriptionStatus = 1;
            };
            function f (d){

            };
            AcceptTermsOfService.index(s, f);
        };
        $scope.readyTermsOfService = function(){
            function s(d){
                $scope.terms = d;
            };
            function f(d){

            };
            TermsOfService.index(s, f);
        }
        $scope.readyTermsOfService();
    })

    .directive('dropMenuEmpresa', function () {
        return {
            restrict: 'E',
            template: '<div class="btn-group" dropdown is-open="status.isopenFilter1"><button type="button" class="btn btn-action dropdown-toggle" dropdown-toggle ng-disabled="disabled"><i class="fa fa-building icon"></i> Empresas <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div>'
        }
    })

    .directive('filterConfiguracoes', function(){
        return {
            restrict: 'E',
            template: '<div class="btn-group" dropdown is-open="status.isopenFilter2"><button type="button" class="btn btn-action2 dropdown-toggle" dropdown-toggle ng-disabled="disabled"><i class="fa fa-cog icon"></i> </button><ul class="dropdown-menu" role="menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div>'
        }
    })

    .directive('filterEntrada', function(){
        return {
            restrict: 'E',
            template: '<div class="btn-group" dropdown><button type="button" class="btn btn-default">Entrada</button><button type="button" class="btn btn-default dropdown-toggle" dropdown-toggle><span class="caret"></span><span class="sr-only">Split button!</span></button><ul class="dropdown-menu" role="menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div>'
        }
    })

    .directive('filterSaida', function(){
        return {
            restrict: 'E',
            template: '<div class="btn-group" dropdown><button type="button" class="btn btn-default">Saída</button><button type="button" class="btn btn-default dropdown-toggle" dropdown-toggle><span class="caret"></span><span class="sr-only">Split button!</span></button><ul class="dropdown-menu" role="menu"><li><a href="#">Saída</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div>'
        }
    })

    .directive('filterPeriodShared',function() {
        return {
            //restrict: 'E',
            //templateUrl: 'js/app/views/shared/directives/filter-period-dir.html',
            restrict: 'A',
            template: '<option  ng-repeat="periodo in optionsPeriod" ng-selected="{{4 == periodo.Id}}" value="{{::periodo.Id}}"> {{::periodo.Option}} </option>',
            controller: 'filterPeriodSharedCtrl'
            //replace: true,
            //require: 'ngModel,ngChange'
        };

    })

    .controller('filterPeriodSharedCtrl', function ($scope,$filter) {
        $scope.optionsPeriod  = [
            {Option:  i18n.t('configuration.filters.period.today'), Id: '1' },
            {Option: i18n.t('configuration.filters.period.yesterday') , Id: '2'},
            {Option: i18n.t('configuration.filters.period.currentWeek') , Id: '3'},
            {Option: i18n.t('configuration.filters.period.currentMonth'), Id: '4'},
            {Option: i18n.t('configuration.filters.period.lastMonth') , Id: '5'},
            {Option: i18n.t('configuration.filters.period.currentYear'), Id: '6'},
            {Option:  i18n.t('configuration.filters.period.custom'), Id: '7'}
        ];

        $scope.filtroGeral.Period = '4';

        $scope.convertDate = function (date) {
            return $filter('date')(date, 'yyyy-MM-dd');
        }

        $scope.showFilterDate = function () {
            if ($scope.filtroGeral.Period == 7) {
                $scope.filtroPersonalizado = 'show';
                //$scope.filtroGeral.DateFrom =  new Date();
                //$scope.filtroGeral.DateTo = new Date();
                $scope.filtroGeral.DateFrom = "";
                $scope.filtroGeral.DateTo = "";


            } else {
                $scope.filtroPersonalizado = 'none-hide-content';
                $scope.filtroGeral.DateFrom = "";
                $scope.filtroGeral.DateTo = "";
                $scope.loadInformation();
            }
        }

        $scope.activeDateFilter = function (objDate) {

            if ((objDate.DateFrom != undefined && objDate.DateFrom != "") && (objDate.DateTo != undefined && objDate.DateTo != "")) {

                var dateFromnormal = $scope.filtroGeral.DateFrom
                var dateTonormal = $scope.filtroGeral.DateTo;

                var dateToformated =  $scope.convertDate($scope.filtroGeral.DateTo);
                var dateFromformated = $scope.convertDate($scope.filtroGeral.DateFrom);

                $scope.filtroGeral.DateFrom = dateFromformated;
                $scope.filtroGeral.DateTo = dateToformated;

                $scope.loadInformation();

                $scope.filtroGeral.DateFrom = dateFromnormal;
                $scope.filtroGeral.DateTo = dateTonormal;
            }
        }

        $scope.showFilterDate();

    })

    .directive('sharedDatePickers', function () {
        return {
            restrict: 'A',
            template: '<div class="col-md-3 col-xs-12 col-sm-3 none-hide-content" ng-class="filtroPersonalizado">' +
            '<div class="col-md-6 col-xs-12 col-sm-6 ng-scope" ng-controller="DateFromCtrl" style="max-height:26px; color: #000">' +
            '<div class="row">' +
            '<p class="input-group datepicker-custom">' +
            '<input style="color: #000" required="required" class="form-control btn btn-default ng-pristine ng-untouched ng-isolate-scope ng-invalid ng-invalid-required ng-valid-date" uib-datepicker-popup="dd/MM/yyyy" ng-click="open($event)" ng-change="activeDateFilter(filtroGeral)" ng-model="filtroGeral.DateFrom" is-open="status.opened"  datepicker-options="dateOptions" ng-required="true" close-text="Fechar" ng-switch="datepickerMode" clear-text="Limpar" current-text="Hoje" type="text">' +
            '<span class="input-group-btn">' +
            '<button style="color: #000" type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i> De  </button>' +
            '</span>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-6 col-xs-12 col-sm-6 ng-scope " ng-controller="DateToCtrl" style="max-height:26px;color: #000">' +
            '<div class="row">' +
            '<p class="input-group datepicker-custom">' +
            '<input required="required" style="color: #000" class="form-control btn btn-default ng-pristine ng-untouched ng-isolate-scope ng-invalid ng-invalid-required ng-valid-date" uib-datepicker-popup="dd/MM/yyyy" ng-click="open($event)" ng-change="activeDateFilter(filtroGeral)" ng-model="filtroGeral.DateTo" is-open="status.opened" min-date="filtroGegral.DateTo"  datepicker-options="dateOptions" ng-required="true" close-text="Fechar" ng-switch="datepickerMode" clear-text="Limpar" current-text="Hoje" type="text">' +
            '<span class="input-group-btn">' +
            '<button type="button" style="color: #000" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i> Até</button>' +
            '</span>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>'
        };
    })

    .directive('filterGroupProduct', function () {
        return {
            restrict: 'A',
            template: '<option  ng-repeat="group in grupoProdutos" ng-selected="{{1 == group.productGroupId}}" value="{{::group.productGroupId}}"> {{::group.productGroup}} </option>',
            controller: 'filterGroupProductSharedCtrl'
        }

    })

    .controller('filterGroupProductSharedCtrl', function($scope, productsGroup) {

        $scope.getAllGroups = function() {
            function success(data) {
                var todosGrupos = {
                    productGroupId: '', productGroup: i18n.t('configuration.filters.allGroups') != undefined ? i18n.t('configuration.filters.allGroups') : "Todos os grupos"
                }

                $scope.grupoProdutos = data;

                if (data.length > 1) {
                    $scope.grupoProdutos.unshift(todosGrupos);
                } else {
                    $scope.grupoProdutos.unshift(todosGrupos);
                }

                $scope.filtroGeral.ProductGroupId = "";
            };

            function failure(data) {


            };

            productsGroup.index(success, failure);
        }



        $scope.getAllGroups();



    })

    .directive('filterPeriodo', function () {
        return {
            restrict: 'E',
            template: '<div class="btn-group filter-large"><label class="btn btn-default" ng-model="radioModel" btn-radio="\'Filter2\'" uncheckable>Dia</label><label class="btn btn-default" ng-model="radioModel" btn-radio="\'Filter3\'" uncheckable>Semana</label><label class="btn btn-default" ng-model="radioModel" btn-radio="\'Filter4\'" uncheckable>Mes</label><label class="btn btn-default" ng-model="radioModel" btn-radio="\'Filter5\'" uncheckable>Período</label></div>'
        }
    })

    .directive('filterPesquisa', function() {
        return {
            restrict: 'E',
            template: '<div class="form-group"><div class="input-group"><input type="text" class="form-control" id="exampleInputAmount" placeholder="Codigo, Descrição"><div class="input-group-addon"><i class="fa fa-search"></i></div></div></div>'
        }
    })

    .directive('widgetLoading', function () {
        return {
            restrict: 'A',
            template:  '<div id="circleG">     <div id="circleG_1" class="circleG"></div>     <div id="circleG_2" class="circleG"></div>     <div id="circleG_3" class="circleG"></div> </div>'
        }
    })

    .directive("ngFileSelect",function(){
        return {
            link: function($scope,el){
                el.bind("change", function(e){
                    $scope.file = (e.srcElement || e.target).files;
                    $scope.getFile();
                })
            }
        }
    })

    .directive('loadInformationButton', function(){
        return {
            restrict: 'E',
            template: '<div class="pull-right"> <div class="reloadAllFilterClass"> <i ng-click="loadInformation()" class="fa fa-refresh"></i> </div> </div>'
        }
    })

    .directive('onKeyupFn', function () {
        return function (scope, elm, attrs) {
            //Evaluate the variable that was passed
            //In this case we're just passing a variable that points
            //to a function we'll call each keyup
            var keyupFn = scope.$eval(attrs.onKeyupFn);
            elm.bind('keyup', function (evt) {
                //$apply makes sure that angular knows
                //we're changing something
                scope.$apply(function () {
                    keyupFn.call(scope, evt.which);
                });
            });
        };
    })

    .directive('onKeyup', function () {
        return function (scope, elm, attrs) {
            function applyKeyup() {
                scope.$apply(attrs.onKeyup);
            };

            var allowedKeys = scope.$eval(attrs.keys);
            elm.bind('keyup', function (evt) {
                //if no key restriction specified, always fire
                if (!allowedKeys || allowedKeys.length == 0) {
                    applyKeyup();
                } else {
                    angular.forEach(allowedKeys, function (key) {
                        if (key == evt.which) {
                            applyKeyup();
                        }
                    });
                }
            });
        };
    })

    .directive('fallbackSrc', function () {
        var fallbackSrc = {
            link: function postLink(scope, iElement, iAttrs) {
                iElement.bind('error', function () {
                    angular.element(this).attr("src", iAttrs.fallbackSrc);

                });
            }
        }
        return fallbackSrc;
    })

    .directive('fallbackBackground', function () {
        var fallbackSrc = {
            link: function postLink(scope, iElement, iAttrs) {
                iElement.bind('error', function () {
                    angular.element(this).attr("src", iAttrs.fallbackSrc);
                    angular.element.parent().css('background-image', 'url("' +  iAttrs.fallbackSrc + '")');
                });
            }
        }
        return fallbackSrc;
    })

    .directive('filterTypeProductCurvaAbc', function () {
        return {
            restrict: 'A',
            controller: 'filterTypeProductCurvaAbcCtrl',
            template: '<option  ng-repeat="option in TypeProductsCurvaAbc" ng-selected="{{0 == option.id}}" value="{{option.id}}"> {{::option.name}} </option>'
        }
    })

    .controller('filterTypeProductCurvaAbcCtrl', function ($scope) {
        $scope.TypeProductsCurvaAbc = [
            { id: '0', name: i18n.t('configuration.filters.product') != undefined ? i18n.t('configuration.filters.product') :  "Produto" },
            { id: '1', name: i18n.t('configuration.filters.productGroup') != undefined ? i18n.t('configuration.filters.productGroup') :  "Grupo de produto" }
        ];

        $scope.filtroGeral.ProductOrGroup = '0';

    })

    .directive('filterTypeVendaCurvaAbc', function () {
        return {
            restrict: 'A',
            controller: 'filterTypeVendaCurvaAbcCtrl',
            template: '<option  ng-repeat="option in TypeVendasCurvaAbc" ng-selected="{{0 == option.id}}" value="{{::option.id}}"> {{::option.name}} </option>'
        }
    })

    .controller('filterTypeVendaCurvaAbcCtrl', function ($scope) {
        $scope.TypeVendasCurvaAbc = [
            { id: '0', name: i18n.t('configuration.filters.sales') != undefined ? i18n.t('configuration.filters.sales') :  "Vendas" },
            { id: '1', name: i18n.t('configuration.filters.stock') != undefined ? i18n.t('configuration.filters.stock') :  "Estoque" }
        ];

        $scope.filtroGeral.SaleOrStock = '0';
    })

    .directive('carousel', function(){
        return {
                    restrict: 'AE',
                    controller: 'carouselCtrl',
                    template: '<uib-carousel active="active" interval="myInterval" no-wrap="noWrapSlides"> <uib-slide ng-repeat="slide in slides track by slide.id" index="slide.id"> <img ng-src="{{slide.image}}" style="margin:auto;"> <div class="carousel-caption"> </div> </uib-slide>     </uib-carousel>'
                }
    })

    .controller('carouselCtrl', function($scope){
         $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            $scope.active = 0;
            var slides = $scope.slides = [];
            var currIndex = 0;
            $scope.addSlide = function(url, text) {
                text = text == undefined ? '': text;
                var newWidth = 600 + slides.length + 1;
                slides.push({
                image: url,
                text: [text][text],
                id: currIndex++
                });
            };
            $scope.randomize = function() {
                var indexes = generateIndexesArray();
                assignNewIndexesToSlides(indexes);
            };
            function assignNewIndexesToSlides(indexes) {
                for (var i = 0, l = slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
                }
            }
            function generateIndexesArray() {
                var indexes = [];
                for (var i = 0; i < currIndex; ++i) {
                indexes[i] = i;
                }
                return shuffle(indexes);
            }
            function shuffle(array) {
                var tmp, current, top = array.length;

                if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
                }

                return array;
            }
    })

    .directive('filterModelNf', function() {
        return {
            restrict: 'A',
            controller: 'filterModelNfCtrl',
            template: '<option  ng-repeat="option in modelNf" ng-selected="{{0 == option.id}}" value="{{::option.id}}"> {{::option.name}} </option>'
        }
    })

    .controller('filterModelNfCtrl', function ($scope) {
        $scope.modelNf = [
            { id: '0', name: 'Todas'},
            { id: '1', name: 'Nfc-e'},
            { id: '2', name: 'Sat'}
        ];

        $scope.filtroGeral.modelNf = '0';
    })

    .directive('filterStatusNf', function () {
        return {
            restrict: 'A',
            controller: 'filterStatusNfCtrl',
            template: '<option  ng-repeat="option in statusNf" ng-selected="{{0 == option.id}}" value="{{::option.id}}"> {{::option.name}} </option>'
        }
    })

    .controller('filterStatusNfCtrl', function ($scope) {
        $scope.statusNf = [
            { id: '0', name: 'Todas' },
            { id: '1', name: 'Emitidas' },
            { id: '2', name: 'Canceladas' }
        ];

        $scope.filtroGeral.statusNf = '0';
    })

//página de produtos ------------------------------------------------------------//

    .directive('filterStockSelect', function () {
        return {
            restrict: 'A',
            controller: 'StockSelectCtrlDir',
            template: '<option value="" ng-selected="product.stock._id == undefined" ng-bind="t.stock"></option>   <option  ng-repeat="item in stockList" ng-selected="product.stock._id == item._id" value="{{item._id}}"> {{item.name}} </option>'
        }
    })

    .controller("StockSelectCtrlDir", function($scope, stocks, growl){
        function s(data){
            if(!data.error){
                $scope.stockList = data.message;
            }else
                growl.error(data.message);
        }
        function f(data){
            growl.error(data.message);
        }
        stocks.get(s, f);
        
    })

    .directive('filterProductCategory', function () {
        return {
            restrict: 'A',
            controller: 'ProductCategoryCtrlDir',
            template: '<option  ng-repeat="item in categoryListToProducts" ng-selected="{{null == item.id}}" value="{{::item.id}}"> {{::item.name}} </option>'
        }
    })

    .controller("ProductCategoryCtrlDir", function($scope){
        $scope.categoryListToProducts = [
            { id: '', name: '(Obrigatorio)' },
            { id: 1, name: 'Anel' },
            { id: 2, name: 'Alargadores' }
        ]

        $scope.product.category_id = '';
    })

    .directive("filterUnitMeasure", function(){
        return {
            restrict: 'A',
            controller: 'UnitMeasureCtrlDir',
            template: '<option value="" ng-selected="product.unitMeasure == undefined" ng-bind="t.unitMeasure"></option><option  ng-repeat="item in unitmeasuresList" ng-selected="product.unitMeasure == item._id" value="{{item._id}}"> {{item.symbol}} </option>'
        }
    })

    .controller("UnitMeasureCtrlDir", function($scope, unitMeasures){
        $scope.unitmeasuresList = unitMeasures;
        // input padrao unidade de medida
        $scope.product.unit_measure_id = '';
        $scope.getSymbol = function(u){
                $scope.symbol = '';
                var r = $scope.unitmeasuresList.filter(function(i){
                    return i["_id"] == u;
                });
                $scope.symbol = r[0].symbol;
        };
    })

    .directive("filterUfTo", function() {
        return {
            strict: 'A',
            controller: 'UfCtrlDir',
            template: '<option ng-selected="item.to == itemTo"  ng-repeat="itemTo in listUf"  value="{{itemTo}}" selected>{{itemTo.name}}</option>'
        }
    })

    .directive("filterUfFor", function() {
        return {
            strict: 'A',
            controller: 'UfCtrlDir',
            template: '<option ng-selected="item.for == itemFor" ng-repeat="itemFor in listUf" value="{{itemFor}}">{{itemFor.name}}</option>'
        }
    })
    .controller("UfCtrlDir", function($scope, countries){
        $scope.getCountry = function(){
            function s (data){
                if(!data.error){
                    $scope.country = data.message;
                    $scope.makeStates();
                }
                else
                      growl.error("Erro ao carregar cidades e estados: " + data.message);
            }
            function f (data){
                    growl.error("Ocorreu um erro no servidor: " + data.message);
            }
            countries.get({country:'577eec12725f1fe6210f8505'}, s,f);
        }();
        $scope.makeStates = function(){
            if($scope.countr != undefined){
                $scope.states = $scope.country.states;
                $scope.listUf = $scope.states;
             }
        };
    })
    .directive("filterSaleType", function() {
        return {
            strict: 'A',
            controller: 'SaleTypeCtrlDir',
            template: '<option ng-selected="item.saleType == itemSale.id" ng-repeat="itemSale  in saleTypeList" value="{{itemSale.id}}">{{itemSale.name}}</option>'
        }

    })

    .controller("SaleTypeCtrlDir", function($scope){

        /*lista de tipo de venda */
        $scope.saleTypeList = [
            {id: '', name:'Selecione tipo de venda'},
            { id: '1', name: 'Venda para cliente final' },
            { id: '2', name: 'Venda para franquia' },
            { id: '3', name: 'Venda para fornecedor' },
            { id: '4', name: 'Venda para revendedores' },
        ];
    })

    .directive("filterTributarySituationIcms", function() {
        return {
            strict: 'A',
            controller:'TributarySituationCtrlDir',
            template: '<option ng-selected="item.taxSituation == itemTax.id" ng-repeat="itemTax in taxSituationList" value="{{itemTax.id}}">{{itemTax.name}}</option>'
        }
    })

    .directive("filterTributarySituationIpi", function() {
        return {
            strict: 'A',
            controller:'TributarySituationCtrlDir',
            template: '<option ng-selected="ipi.tributarySituation == itemTax.id" ng-repeat="itemTax in taxSituationList" value="{{itemTax.id}}">{{itemTax.name}}</option>'
        }
    })

    .directive("filterTributarySituationPis", function() {
        return {
            strict: 'A',
            controller: 'TributarySituationCtrlDir',
            template: '<option ng-selected="{{pis.tributarySituation == item.id }}" ng-repeat="item in taxSituationList" value="{{item.id}}">{{item.name}}</option>'
        }
    })

    .directive("filterTributarySituationCofins", function() {
        return {
            strict: 'A',
            controller: 'TributarySituationCtrlDir',
            template: ' <option ng-selected="cofins.tributarySituation == item.id"  ng-repeat="item in taxSituationList" value="{{item.id}}">{{item.name}}</option>'
        }
    })

    .controller("TributarySituationCtrlDir", function($scope){
        $scope.taxSituationList = [
            {id: '', name:'Selecione a situação tributaria'},
            { id: '1', name: 'situacao 1' },
            { id: '2', name: 'situacao 2' },
            { id: '3', name: ' situacao 3' },
            { id: '4', name: ' situacao 4' },
        ];
    });

}());



