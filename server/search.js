SearchSource.defineSource('lineages', function(searchText, options) {

  var res = Meteor.http.get(
    process.env.ES_HOST + '/ncbitaxonomy/lineages/_search',
    {
      data: {
	size : 50,
	fields : ['tax_id', 'superkingdom', 'kingdom', 'phylum', 'class',
		  'order', 'family', 'genus', 'species'],
	query: {
	  match : { species : searchText}
	},
	highlight : {
	  pre_tags : ["<mark>"],
	  post_tags : ["</mark>"],
	  fields : {
	    superkingdom: {},
	    kingdom: {},
	    phylum: {},
	    class: {},
	    order: {},
	    family: {},
	    genus: {},
	    species: {}
	  }
	}
      }
    }
  );

  if (res.statusCode === 200) {
    content = JSON.parse(res.content);
    // console.log(content.hits.hits[0]);
    // e.g.
    // { _index: 'ncbitaxonomy',
    //   _type: 'lineages',
    //   _id: '55d60f88167b1eda93877447',
    //   _score: 8.998497,
    //   fields:
    //   { phylum: [ 'Arthropoda' ],
    // 	superkingdom: [ 'Eukaryota' ],
    // 	species: [ 'Asestra cabiria' ],
    // 	kingdom: [ 'Metazoa' ],
    // 	order: [ 'Lepidoptera' ],
    // 	family: [ 'Geometridae' ],
    // 	class: [ 'Insecta' ],
    // 	tax_id: [ 717349 ],
    // 	genus: [ 'Asestra' ] },
    //   highlight:
    //   { species: [ '<mark>Asestra</mark> cabiria' ],
    // 	genus: [ '<mark>Asestra</mark>' ] } }

    return content.hits.hits
  } else {
    console.log(res);
  }
});


Meteor.startup(function () {
  // code to run on server at startup
  console.log('Meteor starting up');
  // console.log(SearchSource);
});
