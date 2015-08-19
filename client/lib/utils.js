isValidSearchText = function isValidSearchText(str) {
  return (str !== '' && str !== undefined);
}


// https://meteorhacks.com/implementing-an-instant-search-solution-with-meteor
var search_options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

var search_fields = ['superkingdom',
		     'kingdom',
		     'phylum',
		     'class',
		     'order',
		     'family',
		     'genus',
		     'species'];

LineageSearch = new SearchSource('lineages', search_fields, search_options);
