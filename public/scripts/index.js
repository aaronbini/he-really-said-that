(function(module){

  var pageLoad = {};

  pageLoad.total = null;

  function getQuote() {
    $('footer').hide();
    var quote = pageLoad.quoteArray[pageLoad.quoteCount];
    toHtml('quote-template', quote, '#quote-info');
    $('footer').show();
  }

  pageLoad.next = function () {
    if (pageLoad.quoteCount < pageLoad.quoteArray.length - 1) {
      pageLoad.quoteCount++;
      getQuote();
    } else {
      pageLoad.quoteCount = 0;
      getQuote();
    }
  };

  pageLoad.last = function () {
    if (pageLoad.quoteCount > 0) {
      pageLoad.quoteCount--;
      getQuote();
    } else {
      pageLoad.quoteCount = pageLoad.quoteArray.length - 1;
      getQuote();
    }
  };

  pageLoad.getQuotes = function () {
    superagent
    .get('../data/quotes.json')
    .then(result => {
      pageLoad.total = result.body.length;
      $('#quote-count').append('Total Quotes: ' + pageLoad.total);
      pageLoad.quoteCount = 0;
      var arr = result.body.map(function(e,i) {
        e.count = i + 1;
        e.audioPath = '/lib/audio/' + e.audioFile;
        return e;
      });
      pageLoad.quoteArray = arr;
      getQuote();
    })
    .catch(err => {
      $('#notification-bar').append('<p>' + err + '</p>');
    });
  };

  pageLoad.setButtonListener = function() {
    $('#get-quotes').on('click', function(e) {
      e.preventDefault();
      pageLoad.next();
    });

    $('#last-quote').on('click', function(e) {
      e.preventDefault();
      pageLoad.last();
    });
  };

  pageLoad.setButtonListener();
  pageLoad.getQuotes();

  module.pageLoad = pageLoad;
})(window);
