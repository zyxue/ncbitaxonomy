// Meteor.publish('theLineages', function (taxonName) {
//   check(taxonName, String);
//   if (taxonName.length < 3) {
//     return []
//   } else {
//    return  Lineages.find({'species': {$regex: new RegExp(taxonName, 'i')}});
//   }
// });

Meteor.publish('theLineages', function () {
   return  Lineages.find();
});
