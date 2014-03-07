$(function () {
    'use strict';

    var cardsArray = $.map(cards, function (value, key) { return { value: decodeURIComponent(value), data: key }; });

    // Setup jQuery ajax mock:
    $.mockjax({
        url: '*',
        responseTime: 2000,
        response: function (settings) {
            var query = settings.data.query,
                queryLowerCase = query.toLowerCase(),
                re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                suggestions = $.grep(cardsArray, function (card) {
                     // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
                    return re.test(card.value);
                }),
                response = {
                    query: query,
                    suggestions: suggestions
                };

            this.responseText = JSON.stringify(response);
        }
    });



    // Initialize autocomplete with local lookup:
    $('#search').autocomplete({
        triggerSelectOnValidInput: false,
        lookup: cardsArray,
        minChars: 3,
        onSelect: function (suggestion) {
            $(location).attr('href','card-info.html?id='+suggestion.data);
        }
    });
    
});