(function(module){

  function getRandom(array) {
    var total = array.length - 1;
    var randomNum = Math.floor(Math.random() * total);
    return array[randomNum];
  };

  var pageLoad = {};

  pageLoad.getQuotes = function () {
    superagent
    .get('../data/quotes.json')
    .then(result => {
      var quote = getRandom(result.body);
      quote.audioPath = '/lib/audio/' + quote.audioFile;
      toHtml('quote-template', quote, '#quote-info');
    })
    .catch(err => {
      console.log(err);
    });
  };

  pageLoad.setButtonListener = function() {
    $('#get-quotes').on('click', function(e) {
      e.preventDefault();
      $('#quote-info').empty();
      pageLoad.getQuotes();
    });
  };

  pageLoad.setButtonListener();

  module.pageLoad = pageLoad;
})(window);
