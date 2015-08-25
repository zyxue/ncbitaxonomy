isValidSearchText = function isValidSearchText(str) {
  return (str !== '' && str !== undefined);
}


// https://github.com/meteorhacks/search-source
var search_options = {
  keepHistory: 1000 * 60 * 5,	// in mills
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
