Template.lineages.helpers({
  getLineages: function() {
    return LineageSearch.getData({
      docTransform: function(doc) {
	var res = doc.fields;
	for (var key in doc.fields) {
	  if (doc.highlight[key] !== undefined) {
	    // update fields that have been highlighted.
	    // because it's an array, e.g. [ 'Proteobacteria' ]
	    res[key] = doc.highlight[key][0];
	  }
	}
	return res;
      }
    });
  },

  isLoading: function() {
    return LineageSearch.getStatus().loading;
  },

  isError: function() {
    return LineageSearch.getStatus().error;
  },

});


Template.lineage.helpers({
  genNcbiTaxonomyUrl: function(tax_id) {
    return 'http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=' + tax_id;
  },

});


Template.body.helpers({
  SearchText: function () {
    var taxonName = Session.get('taxonName');
    if (isValidSearchText(taxonName)) {
      return taxonName
    }
  },

});


// Template.body.helpers({
//   totalNumLineages: function() {
//     return Lineages.find().count();
//   },
// });


Template.body.events({
  // use _.throttle to avoid sending every keystroke to the server
  // http://docs.meteor.com/#/full/eventmaps

  'keypress .lineage-filter, keydown .lineage-filter, keyup .lineage-filter, \
     focus .lineage-filter, blur .lineage-filter': _.throttle(function (event) {
       // 'keypress .lineage-filter': _.throttle(function (event) {
       var taxonName = event.target.value;
       Session.set('taxonName', taxonName);
       if (isValidSearchText(taxonName)) {
	 // console.log(taxonName);
	 LineageSearch.search(taxonName);
       }
     }, 200),

});
