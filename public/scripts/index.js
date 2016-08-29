(function(module){

  var pageLoad = {};

  pageLoad.quoteCount = 0;
  pageLoad.total = null;

  function getQuote(array) {
    if (pageLoad.quoteCount < array.length) {
      return array[pageLoad.quoteCount++];
    } else {
      pageLoad.quoteCount = 0;
      return array[pageLoad.quoteCount++];
    }
  };

  pageLoad.getAndSendQuoteCount = function() {
    superagent
    .get('../data/quotes.json')
    .then(result => {
      pageLoad.total = result.body.length;
      $('#quote-count').append(`Total Quotes: ${pageLoad.total}`);
    });
  };

  pageLoad.getQuotes = function () {
    superagent
    .get('../data/quotes.json')
    .then(result => {
      var quote = getQuote(result.body);
      quote.count = pageLoad.quoteCount;
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
  pageLoad.getAndSendQuoteCount();

  module.pageLoad = pageLoad;
})(window);
