(function(module){

  var pageLoad = {};

  pageLoad.pageCount = 0;

  function getQuote(array) {
    if (pageLoad.pageCount < array.length) {
      return array[pageLoad.pageCount++];
    } else {
      pageLoad.pageCount = 0;
      return array[pageLoad.pageCount];
    }
  };

  pageLoad.getQuotes = function () {
    superagent
    .get('../data/quotes.json')
    .then(result => {
      var quote = getQuote(result.body);
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
