var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');





var url = "https://api.etsy.com/v2/listings/active.js?api_key=sli2r3htcrygifk6uyuicuzp&keywords=watch&includes=Images,Shop";



function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

var source = $("#all-cat-template").html();
var template = handlebars.compile(source);

function logData(data){
  var objectData = data.results;
  console.log(data.results);
  objectData.forEach(function(value, index, thisArray){
    var sortedData = {
     title: thisArray[index].title,
     price: thisArray[index].price,
     currency_code: thisArray[index].currency_code,
     manufacturer: thisArray[index].Shop.shop_name,
     image: thisArray[index].Images[0].url_fullxfull,
    }
    $(".all-cat-imgs").append(template(sortedData));
  });



}

fetchJSONP(url, logData);
