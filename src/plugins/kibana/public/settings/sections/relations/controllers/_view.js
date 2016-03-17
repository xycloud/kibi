/*global define*/
define(function (require) {

  // path to view template
  var relAdvViewHTML = require('plugins/kibana/settings/sections/relations/_view.html');
  require('ui/routes').when('/settings/relations/:service/:id', {
    template: relAdvViewHTML
  });

  var app = require('ui/modules').get('apps/settings', ['kibana']);

  // relation edit button controller
  app.controller('RelationsAdvancedController', function (
		$scope, $routeParams, config, kbnUrl) {

    $scope.relations = config.get('kibi:relations');

	  // default values
    var i = 0;
    var key = 0;
    var defValues = {orderBy: 'default', maxTermsPerShard: 'all terms', termsEncoding: 'bloom'};

    // lists of values to display
    $scope.values = {
      orderByValues: ['default', 'doc_score'],
      maxTermsPerShardValues: ['all terms'],
      termsEncodingValues: ['long', 'integer', 'bloom']
    };

    // set default object properties
    if ($routeParams.service === 'indices') {
      $scope.relationService = $scope.relations.relationsIndices[$routeParams.id][$routeParams.service];

      for (i = 0; i <= 1; i++) {
        if (typeof $scope.relationService[i] === 'object' && $scope.relationService[i] !== null) {
          for (key in defValues) {
            if (defValues.hasOwnProperty(key)) {
              if (!$scope.relationService[i][key] || $scope.relationService[i][key] === 'undefined') {
                $scope.relationService[i][key] = defValues[key];
              }
            }
          }
        }
      }
    }

    // cancel buttono
    $scope.cancel = function () {
      kbnUrl.change('/settings/relations');
    };

    // save button
    $scope.submit = function () {
      config.set('kibi:relations', $scope.relations);
    };

  });
});
