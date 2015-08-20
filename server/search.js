SearchSource.defineSource('lineages', function(searchText, options) {
  var options = {sort: {species: -1}, limit: 50};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {'superkingdom': regExp},
      {'species': regExp}
    ]};
    
    return Lineages.find(selector, options).fetch();
  } else {
    return Lineages.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  var parts = searchText.trim().split(/[ \-\:]+/);
  // for speeding up regex search, http://docs.mongodb.org/manual/reference/operator/query/regex/
  parts = parts.map(function(s) {return '^' + s;});
  return new RegExp("(" + parts.join('|') + ")", "ig");
};



Meteor.startup(function () {
  // code to run on server at startup
  console.log('Meteor starting up');
  // console.log(SearchSource);
  // console.log(buildRegExp);
});
