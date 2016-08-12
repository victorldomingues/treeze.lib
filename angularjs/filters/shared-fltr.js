(function () {
    
    angularTzModule.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }
            /*
                 *Usage:
                 *{{some_text | cut:true:100:' ...'}}
             */
            return value + (tail || ' …');
        };
    });

    angularTzModule.filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        }
    });

    angularTzModule.filter('separador', function() {
        return function(teste, delimiter) {
            if(teste != null){
                var delimiter = delimiter || ',';
                    return teste.split(delimiter);
            }
        }

    });

    angularTzModule.filter('toBrlNumber', function () {
        return function (input) {
            return input.replace('.', ',');
        };
    });

    angularTzModule.filter('cpfmask', function() {

        return function(value){
           return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
        }

    });

    angularTzModule.filter('cnpjmask', function() {

        return function(value){

           return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
        }

    });

   angularTzModule.filter('removemask', function(){
        return function(value){
           return value.replace(/(\.|\/|\-)/g,"");
        }
     });

   angularTzModule.filter('cepmask', function() {
      return function(value){
        return value.replace(/^(\d{2})(\d{3})(\d)/,"$1.$2-$3");
      }
   })
    

})();