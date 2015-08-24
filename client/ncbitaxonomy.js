Template.lineages.helpers({
  getLineages: function() {
    return LineageSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, '<mark>$&</mark>')
      },
      sort: {species: -1}
    });
  },

  isLoading: function() {
    return LineageSearch.getStatus().loading;
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
