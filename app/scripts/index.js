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
  console.log(data);
  var objectData = data.results;
  objectData.forEach(displayProductItem);
}
function displayProductItem(product){
  var sortedData = {
      title: product.title.substring(0, 27) + '...',
      price: product.price,
      currency_code: product.currency_code,
      manufacturer: product.Shop.shop_name,
      image: product.Images[0].url_fullxfull
  };
  console.log(product.title.substring(0, 32) + '...');
  $('.js-search-results').append(template(sortedData));
}

// function logData(data){
//   // console.log(data);
//   var objectData = data.results;
//   // console.log(data.results);
//   objectData.forEach(function(value, index, thisArray){
//     var sortedData = {
//      title: thisArray[index].title,
//      price: thisArray[index].price,
//      currency_code: thisArray[index].currency_code,
//      manufacturer: thisArray[index].Shop.shop_name,
//      image: thisArray[index].Images[0].url_fullxfull,
//     }
//     $(".js-search-results").append(template(sortedData));
//   });
//
//
//
// }

fetchJSONP(url, logData);
